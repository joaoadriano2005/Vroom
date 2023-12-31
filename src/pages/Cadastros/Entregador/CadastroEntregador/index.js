import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme } from 'styled-components';
import { validarCPF } from '../../../../components/Validar/ValidarCpf'
export default function CadastroEntregador({ route }) {
  const navigation = useNavigation();
  const tema = useTheme();
  const styles = getstyles(tema);
  const [Identificador, setIdentificador] = useState(route.params?.Identificador || '');
  const [cpf, setCpf] = useState('');
  const [cpfValido, setCpfValido] = useState(true);
  const [nome, setNome] = useState('');
  const [dtNasc, setDtNasc] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');

  const handleChangeCPF = (text) => {
    if (text.length === 14) {
      setCpf(text); // Atualize o valor do CPF à medida que o usuário digita
      const isValid = validarCPF(text); // Valide o CPF
      setCpfValido(isValid); // Atualize o estado do CPF válido
    }else{
      setCpfValido(true);
    }
  };

  function verificaInput() {
    if (
      cpf !== '' &&
      nome !== '' &&
      dtNasc !== '' &&
      telefone !== '' &&
      cep !== '' &&
      estado !== '' &&
      cidade !== '' &&
      bairro !== '' &&
      endereco !== '' &&
      numero !== ''
    ) {
      validarCPF(cpf)
      navigation.navigate('EntregadorRevisa', {
        Identificador,
        cpf,
        nome,
        dtNasc,
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
        <View style={styles.separador2}>
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
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Informações Pessoais</Text>
        <View style={styles.main}>
          <TextInputMask
            style={styles.input}
            type={'cpf'}
            value={cpf}
            onChangeText={handleChangeCPF}
            maxLength={14}
            placeholder='Digite seu CPF'
          />
          {cpf && !cpfValido && <Text style={{ color: 'red' }}>CPF inválido</Text>}
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
          />
          <TextInput
            style={styles.input}
            value={dtNasc}
            placeholder='Data de nascimento'
            keyboardType='numeric'
            maxLength={10}
            onBlur={() => {
              if (dtNasc.length !== 10) {
              }
            }}
            onChangeText={(text) => {
              if (/^\d{2}$/.test(text)) {
                setDtNasc(text + '/');
              } else if (/^\d{2}\/\d{2}$/.test(text)) {
                setDtNasc(text + '/');
              } else {
                setDtNasc(text);
              }
            }}
          />
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            value={telefone}
            onChangeText={setTelefone}
            maxLength={15}
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
            maxLength={9}
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
            keyboardType='numeric'
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
    marginLeft: -30,
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
