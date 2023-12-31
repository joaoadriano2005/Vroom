import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme } from 'styled-components';

export default function Afiliado({ route }) {
    const navigation = useNavigation();
    const tema = useTheme();
    const styles = getstyles(tema);
    const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
    const [cnpj, setCnpj] = useState(route.params?.cnpj);
    const [nomeEmpresa, setNomeEmpresa] = useState(route.params?.nomeEmpresa);
    const [categoria, setCategoria] = useState(route.params?.categoria);
    const [telefone, setTelefone] = useState(route.params?.telefone);
    const [cep, setCep] = useState(route.params?.cep);
    const [estado, setEstado] = useState(route.params?.estado);
    const [cidade, setCidade] = useState(route.params?.cidade);
    const [bairro, setBairro] = useState(route.params?.bairro);
    const [endereco, setEndereco] = useState(route.params?.endereco);
    const [numero, setNumero] = useState(route.params?.numero);
    const [cpfEntregador, setCpfEntregador] = useState('');
    const [nomeEntregador, setNomeEntregador] = useState('');
    const [TelefoneEntregador, setTelefoneEntregador] = useState('');
    function passaTela() {
        navigation.navigate('EmpresaRevisa', {
            Identificador,
            cnpj,
            nomeEmpresa,
            categoria,
            telefone,
            cep,
            estado,
            cidade,
            bairro,
            endereco,
            numero,
            nomeEntregador,
            TelefoneEntregador,
            cpfEntregador
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerContentCircleInative}>
                        <Text style={styles.headerCircleNumber}>
                            {' '}
                            1 {' '}
                        </Text>
                    </View>
                    <Text style={styles.headerText}>Informações</Text>
                </View>
                <View style={styles.separador}>
                    <View style={styles.separadorLinha}></View>
                </View>
                <View style={styles.headerContent}>
                    <View style={styles.headerContentCircle}>
                        <Text style={styles.headerCircleNumber}>
                            {' '}
                            2 {' '}
                        </Text>
                    </View>
                    <Text style={styles.headerText}>Vincular</Text>
                </View>
                <View style={styles.separador2}>
                    <View style={styles.separadorLinha}></View>
                </View>
                <View style={styles.headerContent}>
                    <View style={styles.headerContentCircleInative}>
                        <Text style={styles.headerCircleNumber}>
                            {' '}
                            3 {' '}
                        </Text>
                    </View>
                    <Text style={styles.headerText}>Revisão</Text>
                </View>
            </View>

            <ScrollView
                style={{ width: '100%' }}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>
                    Vincular entregador
                </Text>
                <View style={styles.main}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNomeEntregador}
                        placeholder='Nome do entregador'
                        maxLength={14}
                    />
                    <View style={styles.mainEmpresa}>
                        <Text style={styles.title}>
                            Informações do entregador
                        </Text>
                        <TextInputMask
                            style={styles.input}
                            onChangeText={setCpfEntregador}
                            type={'cpf'}
                            placeholder='CPF'
                            maxLength={14}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setTelefoneEntregador}
                            placeholder='Telefone'
                        />
                    </View>
                </View>
                <Text style={styles.aviso}>
                    Caso não possua entregadores, prossiga
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() => navigation.pop(1)}
                        style={styles.cadastrar}
                    >
                        <Text style={styles.cadastrarText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={passaTela}
                        style={styles.cadastrar}
                    >
                        <Text style={styles.cadastrarText}>Próxima etapa</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}

const getstyles = (tema) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#ffc000',
        width: '100%',
        height: 120,
        padding: 20,
        paddingLeft: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContent: {
        flexDirection: 'column',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,
    },
    headerContentCircle: {
        borderRadius: 50,
        borderWidth: 3,
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#fff',
    },
    headerContentCircleInative: {
        borderRadius: 50,
        borderWidth: 3,
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#e6e4df',
    },
    headerCircleNumber: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    separador: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '30%',
        marginLeft: -41,
        marginRight: -6,
        marginBottom: 20,
    },
    separador2: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '30%',
        marginLeft: -28,
        marginRight: -5,
        marginBottom: 20,
    },
    separadorLinha: {
        flex: 1,
        borderBottomWidth: 3,
        alignSelf: 'center',
        elevation: 1,
    },
    headerText: {
        fontSize: 15,
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
        alignSelf: 'center',
        marginBottom: 10
    },
    input: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 15,
        margin: 5,
        marginLeft: 15,
        width: 300,
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    main: {
        marginTop: 30,
        alignItems: 'center'
    },
    mainEmpresa: {
        padding: 30,
        marginTop: 30,
        paddingTop: 10,
        borderWidth: 1.5,
        borderRadius: 15
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cadastrar: {
        height: 50,
        width: '40%',
        alignSelf: 'center',
        backgroundColor: '#ffc000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 30,
        padding: 5,
    },
    cadastrarText: {
        fontSize: 18,
        color: '#121212',
        fontWeight: 'bold',
    },
    aviso: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 15
    }
})