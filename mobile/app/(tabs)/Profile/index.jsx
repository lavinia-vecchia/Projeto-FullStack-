import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendImage = async (imageUri) => {
    try {
      const data = {
        file: imageUri,
        upload_preset: 'ml_default',
      };

      const res = await fetch('https://api.cloudinary.com/v1_1/dvgat0drr/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${res.statusText}`);
      }

      const result = await res.json();
      setProfileImage(result.url);
      console.log(result)
    } catch (e) {
      console.error('Erro ao enviar imagem:', e);
      Alert.alert('Erro', 'Não foi possível enviar a imagem.');
    }
    
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://192.168.0.100:8000/get.users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Resposta não é JSON');
      }

      const userData = await response.json();
      setName(userData.name);
      setEmail(userData.email);
      setBio(userData.bio);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      handleSendImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Perfil atualizado', 'Suas alterações foram salvas.');
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setIsModalVisible(false);
    } else {
      Alert.alert('Erro', 'As senhas não coincidem.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.profileScreenContainer}>
      <View style={styles.boxProfile}>
        <View style={styles.profileContentWrapper}>
          <View style={styles.profileHeaderWrapper}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../../../assets/images/avatar.png')}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
            {isEditing ? (
              <TextInput
                placeholder='Digite seu nome'
                style={styles.nameInputField}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            ) : (
              <Text style={styles.userNameText}>{name}</Text>
            )}
            <Text style={styles.userEmailText}>{email}</Text>
          </View>

          <View style={styles.profileBodyWrapper}>
            <Text style={styles.bioLabelText}>Bio</Text>
            {isEditing ? (
              <TextInput
                placeholder='Digite sua bio'
                style={styles.bioInputField}
                value={bio}
                onChangeText={(text) => setBio(text)}
                multiline
              />
            ) : (
              <Text style={styles.userBioText}>{bio}</Text>
            )}
          </View>
          <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)} style={styles.botao}>
            <Text style={styles.botaoText}>{isEditing ? "Salvar" : "Editar Perfil"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.botao}>
            <Text style={styles.botaoText}>Trocar Senha</Text>
          </TouchableOpacity>
          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Trocar Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nova senha"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar nova senha"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={handleChangePassword} style={styles.botao2}>
                  <Text style={styles.botaoText2}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.botao2}>
                  <Text style={styles.botaoText2}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileScreenContainer: {
    flex: 1,
    backgroundColor: '#CC1AF9',
    padding: 20,
    justifyContent: 'center',
  },
  profileContentWrapper: {
    margin: 20,
  },
  profileHeaderWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  nameInputField: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  userEmailText: {
    fontSize: 16,
    color: 'gray',
  },
  profileBodyWrapper: {
    marginVertical: 20,
  },
  bioLabelText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  userBioText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  bioInputField: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#0314FF',
    textAlignVertical: 'top',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CC1AF9',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    color: '#333',
    fontSize: 16,
  },
  botao: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  botao2: {
    backgroundColor: '#CC1AF9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  botaoText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoText2: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
 boxProfile: {
    backgroundColor: '#DE6BFA',
    marginHorizontal: 80,
    borderRadius: 10,
    opacity:1
  },
