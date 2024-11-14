import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, SafeAreaView, Image } from 'react-native';
import { Link } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      return alert('Todos os campos devem ser preenchidos');
    }
    
    const formData = {email: email, password: password};

    try {
      const res = fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      switch (response.status) {
        case 2010:
          alert("ok");
          console.log(res.token)
          break;
        case 406:
          alert("Preencha todos os campos");
          break;
        case 418:
          alert("Email já cadastrado");
          break;
        default:
          alert("Erro ao se conectar com servidor");
          break;
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/spotyfake.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>SpotyFake</Text>
        <Text style={styles.taglineText}>Descubra novos Hits!</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="E-mail"
          placeholderTextColor="#fff"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Senha"
          placeholderTextColor="#fff"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
        <Link href="/Home" >
        <Button title="Entrar" onPress={handleLogin} color="#DE6BFA" borderRadius='20' />
        </Link>
        </View>
        <View style={styles.signupPrompt}>
          <Text style={styles.signupText}>Não tem uma conta?</Text>
          <Link href="/signup">
            <Text style={styles.signupLinkText}>Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CC1AF9',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9200B6',
  },
  taglineText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputField: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#DE6BFA',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupPrompt: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
  signupLinkText: {
    color: '#9200B6',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logoImage: {
    backgroundColor:'white',
    borderRadius:'100%',
    marginTop: -30,
    marginBottom: 50,
    width: 200,
    height: 200,
  },
});
