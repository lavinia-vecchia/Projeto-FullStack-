import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    const [name, setName] = useState("");
    const [bday, setBday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        if (!name || !bday || !email || !password) {
            return alert('Todos os campos devem ser preenchidos');
        }

        const formData = {name: name, bday: bday, email: email, password: password};

        try {
            const res = fetch("http://localhost:8000/registro", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            switch (response.status) {
              case 201:
                alert("Usuário criado");
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
    }

    return (
        <SafeAreaView style={styles.registrationContainer}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/images/spotyfake.png')} style={styles.logoImage} />
                <Text style={styles.titleText}>SpotyFake</Text>
                <Text style={styles.subtitleText}>Cadastre-se e crie suas playlists!</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Name"
                    placeholderTextColor="#fff"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
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
                    placeholder="dd/mm/aaaa"
                    placeholderTextColor="#fff"
                    value={bday}
                    onChangeText={(text) => setBday(text)}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Senha"
                    placeholderTextColor="#fff"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Link href="/">
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Cadastre-se</Text>
                    </TouchableOpacity>
                </Link>

                <View style={styles.loginPromptContainer}>
                    <Text style={styles.loginPromptText}>Já tem conta?</Text>
                    <Link href="/">
                        <Text style={styles.loginLinkText}>Entre</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    registrationContainer: {
        flex: 1,
        backgroundColor: '#CC1AF9',
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    titleText: {
        marginTop: -50,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#9200B6',
    },
    subtitleText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
        marginBottom: -20,
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
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#DE6BFA',
        color: 'white',
    },
    registerButton: {
        backgroundColor: '#9200B6',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginPromptContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginPromptText: {
        fontSize: 16,
        color: 'white',
        marginRight: 5,
    },
    loginLinkText: {
        color: '#9200B6',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    logoImage: {
        backgroundColor: 'white',
        borderRadius: '100%',
        marginTop: -40,
        marginBottom: 50,
        width: 180,
        height: 180,
    },
});
