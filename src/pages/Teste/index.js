import React, {useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//select
//import { collection, getDocs, getFirestore } from "firebase/firestore";
//upload de imagem
//import { getStorage, ref, uploadBytes } from "firebase/storage";
//import * as ImagePicker from 'expo-image-picker';
//import * as FileSystem from 'expo-file-system';
//donwload
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
//import  ImageUtils from 'expo-image-utils';


export default function Teste() {

    const navigation = useNavigation();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [nome, setNome] = useState();
    
    const [imageUrl, setImageUrl] = useState(imageUri);
    const [imageUri, setImageUri] = useState(null);

    const chooseImageFromGallery = async () => {
        try {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
          if (status !== 'granted') {
            console.error('A permissão para acessar a galeria foi negada');
            return;
          }
      
          const result = await ImagePicker.launchImageLibraryAsync();
      
          if (!result.canceled) {
            const localUri = result.assets[0].uri;
      
            // Lê o arquivo da imagem como uma string base64 diretamente
            const imageFile = await FileSystem.readAsStringAsync(localUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            console.log(imageFile)
            // Armazena a string base64 na variável de estado imageUrl
            setImageUrl(`data:image/jpeg;base64,${imageFile}`);
          }
        } catch (error) {
          console.error('Erro ao escolher a imagem:', error);
        }
      };
      
    const uploadImageToFirebase = async () => {

        if (imageUrl) {
            try {
                const storage = getStorage();
                const storageRef = ref(storage, 'caminho/no/firebase/imagem.png');
                await uploadBytes(storageRef, imageUrl);
                console.log('Arquivo enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar o arquivo:', error);
            }
        }
    };

    async function validarLogin() {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "users"));
        const dataArray = [];

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            dataArray.push({ id: doc.id, ...userData });

            setNome(userData.nome);
            setCep(userData.cep);
            setCidade(userData.cidade);
        });

        console.log(dataArray);
    }
   async function imagem() {
        try {
            const storage = getStorage();
            const imageRef = ref(storage, 'caminho/imagem');
            const url = await getDownloadURL(imageRef);
            console.log(url)

            setImageUri(url.assets);
          } catch (error) {
            console.error('Erro ao recuperar a URL da imagem:', error);
          }
    }


    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.logoTop}>
                    <Image style={{ width: 200, height: 200 }} source={{ uri: imageUri }} />
                </View>
                <View>
                    <Button title="Escolher Imagem" onPress={chooseImageFromGallery} />
                    {imageUrl && (
                        <Button title="Enviar Imagem" onPress={uploadImageToFirebase} />
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputEmail}
                        value={cidade}
                        //onChangeText={(text) => setEmail(text)}
                        //keyboardType='email-address'
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.inputSenha}
                        // secureTextEntry={true}
                        value={cep}
                        // onChangeText={(text) => setSenha(text)}
                        placeholder="Senha"
                    />
                </View>
                <TouchableOpacity style={styles.recuperarSenha}>
                    <Text>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.logar}
                    onPress={validarLogin}>
                    <Text style={styles.logarText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.separador}>
                    <View style={styles.separadorLinha}></View>
                    <Text style={{ fontSize: 20, elevation: 1 }}>{''} ou {''}</Text>
                    <View style={styles.separadorLinha}></View>
                </View>

                <View style={styles.loginLogos}>
                    <TouchableOpacity>
                        <Image style={{ width: 40, height: 40 }} source={require('../../img/google.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={{ width: 40, height: 40 }} source={require('../../img/face.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={imagem} >
                        <Image style={{ width: 40, height: 40 }} source={require('../../img/apple.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>Não possui conta?</Text>
                <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={{ fontSize: 18 }}>Cadastre-se</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.copy}>
                        Copyright © 2023 Data Explores {'\n'}
                        todos direitos reservados
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
    },
    logoTop: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        alignItems: 'center',
    },
    inputEmail: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 15,
        margin: 5,
        marginLeft: 15,
        width: 300,
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    inputSenha: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 15,
        margin: 5,
        marginLeft: 15,
        width: 300,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    recuperarSenha: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 50,
        marginBottom: 30,
    },
    logar: {
        height: 50,
        width: 250,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    logarText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separador: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 300,
        marginBottom: 15,
        marginTop: 15,
    },
    separadorLinha: {
        flex: 1,
        borderBottomWidth: 1.5,
        alignSelf: 'center',
        elevation: 1,
    },
    loginLogos: {
        width: 300,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    footer: {
        flex: 1,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 15
    },
    copy: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 15
    },
});
