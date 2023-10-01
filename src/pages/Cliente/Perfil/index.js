import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import LogoutModal from '../../../components/logoutModal';

export default function Perfil() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name='notifications' size={30} color='#ffc000' />
                </TouchableOpacity>
            </View>

            <View style={styles.user}>
                <View style={styles.userImg}>
                    <Icon name='person' size={70} color='#939598ff' />
                </View>
                <Text style={styles.userInfo}>Nome do usuário</Text>
            </View>

            <View style={styles.btnArea}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Meus dados</Text>
                    <Icon name='information' size={30} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate('Config')}
                style={styles.button}>
                    <Text style={styles.btnText}>Configurações</Text>
                    <Icon name='cog' size={30} color='#000' />
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.btnText}>Sair da conta</Text>
                    <Icon name='log-out-outline' size={30} color='#000' />
                </TouchableOpacity>
            </View>
            <LogoutModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            />
        </View>
    );
}

const getstyles = (tema) => StyleSheet.create({
    container: {
        felx: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        backgroundColor: tema.Tema.background
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '5%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 30,
        paddingRight: 20,
    },
    user: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    userImg: {
        backgroundColor: '#d1d3d4ff',
        marginRight: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    userInfo: {
        fontSize: 20,
        color: tema.Tema.color
    },
    btnArea: {
        marginTop: 50,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    button: {
        flexDirection: 'row',
        marginBottom: 30,
        backgroundColor: '#ffc000',
        borderRadius: 10,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 60,
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        marginRight: 15,
    },
})