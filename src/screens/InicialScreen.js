import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";
import styles from "../components/styles";
import { getDoc, doc } from "firebase/firestore";
import db from "../config/firebase";

export default function InicialScreen({ navigation }) {

    const [userId, setUserId] = useState(false);
    const [dadosRetorno, setDadosRetorno] = useState(false);


    const getUserId = async () => {
        const usuario_id = await AsyncStorage.getItem("usuario_id").then(id_recebido => {
            setUserId(id_recebido)
        });
    };

    const sair = async () => {
        await AsyncStorage.removeItem("usuario_id");
        setUserId(false);
        navigation.navigate("Login");
    }


    const busca = async () => {
        if (userId) {
            const docSnap = await getDoc(doc(db, "usuarios", userId)).then((doc) => {
                if (doc.exists()) {
                    const dados = doc.data();
                    const arrayDados = Object.values(dados);
                    setDadosRetorno(arrayDados)
                    // Object.entries(dados).forEach(entry => {
                    //     const [key, value] = entry;
                    //     console.log(key, value);
                    // });
                }
            });
        }
    }

    useEffect(async () => {
        await AsyncStorage.getItem("usuario_id").then(id_recebido => {
            setUserId(id_recebido)
            busca()
        });
    }, [userId])



    return (
        <View
            source={require("../../assets/1.webp")}
            style={styles.container}
        >
            <View styles={styles.subcontainer_full}>
                <View styles={styles.subcontainer_full}>
                    <Text>Usuário logado, bem vindo {userId}</Text>
                    <FlatList
                        styles={styles.subcontainer_full}
                        data={dadosRetorno}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View>
            </View>
            <Pressable
                style={styles.button}
                onPress={sair}
            >
                <Text>sair</Text>
            </Pressable>

        </View>
    )
}