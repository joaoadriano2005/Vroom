import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme } from 'styled-components';

export default function CadastroCliente({route}) {
  const navigation = useNavigation();
  const tema = useTheme();
  const styles = getstyles(tema);
  const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');


  function verificaInput() {
    if (
      nome !== '' &&
      telefone !== '' &&
      cep !== '' &&
      estado !== '' &&
      cidade !== '' &&
      bairro !== '' &&
      endereco !== '' &&
      numero !== ''
    ) {
      navigation.navigate('ClienteRevisa', {
        Identificador,
        nome,
        telefone,
        cep,
        estado,
        cidade,
        bairro,
        endereco,
        numero
      });
    } else {
      alert('Campos obrigatórios não preenchidos');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerContentCircle}>
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
          <View style={styles.headerContentCircleInative}>
            <Text style={styles.headerCircleNumber}>
              {' '}
              2 {' '}
            </Text>
          </View>
          <Text style={styles.headerText}>Revisão</Text>
        </View>
      </View>

      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Informações Pessoais</Text>
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
          />
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Telefone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
          />
          <TextInputMask
            style={styles.input}
            type={'zip-code'}
            value={cep}
            onChangeText={setCep}
            placeholder="CEP"
          />
          <TextInput
            style={styles.input}
            value={estado}
            onChangeText={setEstado}
            placeholder="Estado"
          />
          <TextInput
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            placeholder="Cidade"
          />
          <TextInput
            style={styles.input}
            value={bairro}
            onChangeText={setBairro}
            placeholder="Bairro"
          />
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Endereço"
          />
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Número"
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cadastro')}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={verificaInput}
              style={styles.cadastrar}
            >
              <Text style={styles.cadastrarText}>Próxima etapa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const getstyles = (tema) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ffc000',
    width: '100%',
    height: 120,
    padding: 20,
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
    width: '60%',
    marginLeft: -41,
    marginRight: -3,
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
  },
  main: {
    marginTop: 50,
    alignSelf: 'center',
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
