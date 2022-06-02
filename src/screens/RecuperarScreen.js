
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import styles from '../components/styles';
import tw from 'twrnc'

export default function RecuperarScreen({ navigation }) {

  const [email, setEmail] = useState()
  const [error, setError] = useState(false)

  const handleSendPasswordResetEmail = () => {

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Success: Password Reset Email sent.');
        navigation.navigate('Login');
      })
      .catch(error => setError(error.message));
  };


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
        <Text style={{ ...styles.h2, ...styles.tc }}>Recuperar senha</Text>
        {error && (
          <View style={tw`my-5 p-3 bg-purple-800`}><Text style={tw`text-center text-white`}>{error}</Text></View>
        )}
        <View style={tw`my-5 w-[360px]`}>

          <Text>Seu e-mail</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
          />

          <View style={tw`flex justify-between align-between flex-row`}>
            <Pressable
              style={styles.inline_button}
              onPress={() => navigation.navigate('Register')}
            >
              <Text>Fazer registro</Text>
            </Pressable>

          </View>
          <Pressable
            style={styles.button}
            onPress={handleSendPasswordResetEmail}
          >
            <Text style={tw`text-white`}>Recuperar senha</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}