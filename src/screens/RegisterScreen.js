
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../components/styles';
import tw from 'twrnc'
import { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
// import { collection } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {

  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [senha, setSenha] = useState()
  const [user, setUser] = useState()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const requestCreateUser = async () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(
        (userCredential) => {
          setError(false);
          return setDoc(doc(db, "usuarios", userCredential.user.uid), {
            name: name,
            email: email,
            outroDado: "Aqui outro dado de registro",
            idade: 69,
            endereco: 'Rua Fernando Machado'
          });
        }
      )
      .then(() => {
        console.log('Cadastro com sucesso')
      })
      .catch(
        (error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // https://firebase.google.com/docs/auth/admin/errors
          if (errorCode == 'auth/email-already-in-use') {
            setError('E-mail em uso')
            console.log('auth/email-already-in-use.');
          } else {
            console.log(errorMessage);
          }
        }
      );
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
        {success && (
          <View>
            <Text style={styles.h1}>Cadastro com sucesso</Text>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={tw`text-white`}>Fazer Login</Text>
            </Pressable>
          </View>
        )}

        {!success && (
          <View style={tw`my-5 w-[360px]`}>
            <Text style={{ ...styles.h1, ...styles.tc }}>Registro</Text>
            <Text style={{ ...styles.h2, ...styles.tc }}>Faça seu registro</Text>
            {error && (
              <View style={tw`my-5 p-3 bg-purple-800`}><Text style={tw`text-center text-white`}>{error}</Text></View>
            )}
            <Text>Seu e-mail</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
            />
            <Text>Seu Nome</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
            />
            <Text>Sua Senha</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSenha}
            />
            <Pressable
              style={styles.button}
              onPress={requestCreateUser}
            >
              <Text style={tw`text-white`}>Cadastrar</Text>
            </Pressable>
            <View style={tw`flex justify-between align-between flex-row`}>
              <Pressable
                style={styles.inline_button}
                onPress={() => navigation.navigate('Login')}
              >
                <Text>Fazer Login</Text>
              </Pressable>
              <Pressable
                style={styles.inline_button}
                onPress={() => navigation.navigate('Recuperar')}
              >
                <Text>Recuperar senha</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}