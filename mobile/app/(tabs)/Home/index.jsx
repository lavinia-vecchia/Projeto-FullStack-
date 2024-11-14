import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
    } else {
      Alert.alert('Sucesso', `Bem-vindo, ${email}!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SpotyFake</Text>
        <Text style={styles.subHeaderText}>Entre para criar playlists!</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Link href="/Profile" >
          <Button title="Perfil" onPress={handleLogin} color="#DE6BFA" />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC1AF9',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9200B6',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
