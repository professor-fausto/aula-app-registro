
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../components/styles';
import tw from 'twrnc'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()
  const [idDoUsuario, setIdDoUsuario] = useState()

  const setDataIdUsuario = async (valor) => {

    const teste = await AsyncStorage.setItem('usuario_id', valor)
    navigation.navigate('Inicial')
    return teste
  }

  const getUserId = async () => {
    return await AsyncStorage.getItem("usuario_id");
  };

  const request = async () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid)
        return setDataIdUsuario(user.uid)
        // navigation.navigate('Inicial')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  return (
    <ImageBackground
      source={require("../../assets/1.webp")}
      style={styles.container}
    >
      <View style={styles.subcontainer}>
        <Image
          source={require("../../assets/senac.png")}
          style={styles.simpleImage}
          resizeMode={'contain'}
        />
        <Text style={{ ...styles.h1, ...styles.tc }}>Bem vindo</Text>
        <Text>{idDoUsuario}</Text>
        <Text style={{ ...styles.h2, ...styles.tc }}>Faça seu registro</Text>
        <View style={tw`my-5 w-[360px]`}>
          <Text>Seu e-mail</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
          />
          <Text>Sua Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSenha}
          />
          <View style={tw`flex justify-between align-between flex-row`}>
            <Pressable
              style={styles.inline_button}
              onPress={() => navigation.navigate('Register')}
            >
              <Text>Fazer registro</Text>
            </Pressable>
            <Pressable
              style={styles.inline_button}
              onPress={() => navigation.navigate('Recuperar')}
            >
              <Text>Recuperar senha</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.button}
            onPress={request}
          >
            <Text style={tw`text-white`}>Entrar</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}