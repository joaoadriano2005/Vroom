import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeProviderWrapper, useTema } from './src/theme';
import { useTheme, ThemeProvider } from 'styled-components';



import Teste from './src/pages/Teste';
import Mapa from './src/pages/Teste/Mapa';
import Drop from './src/pages/Teste/Drop';
import Login from './src/pages/Login';
import Home from './src/pages/Cliente/Home';
import Search from './src/pages/Cliente/Search';
import Perfil from './src/pages/Cliente/Perfil';
import Pedidos from './src/pages/Cliente/Pedidos';
import Config from './src/pages/Cliente/Perfil/Config1';
import Cadastro from './src/pages/Cadastros/Cadastro';
import CadastroCliente from './src/pages/Cadastros/Cliente/CadastroCliente';
import ClienteRevisa from './src/pages/Cadastros/Cliente/ClienteRevisa';
import CadastroEmpresa from './src/pages/Cadastros/Empresa/CadastroEmpresa';
import EmpresaRevisa from './src/pages/Cadastros/Empresa/EmpresaRevisa';
import CadastroEntregador from './src/pages/Cadastros/Entregador/CadastroEntregador';
import EntregadorRevisa from './src/pages/Cadastros/Entregador/EntregadorRevisa';
import Afiliado from './src/pages/Cadastros/Entregador/Afiliado';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
  Home: {
    name: 'ios-home'
  },
  Buscar: {
    name: 'search'
  },
  Pedidos: {
    name: 'clipboard'
  },
  Perfil: {
    name: 'person'
  }
}


function Tabs() {
  const tema = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={focused ? '#ffc000' : tema.Tema.color} size={25} />;
        },
        tabBarActiveTintColor: '#ffc000',
        tabBarItemStyle: {
          // adicionar algo caso queira
        },
        tabBarStyle: [
          {
            display: 'flex',
            elevation: 10,
            height: 60,
            backgroundColor: tema.Tema.content,
            paddingBottom: 5,
            paddingTop: 5,
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
          },
          null,
        ],
        tabBarLabelStyle: {
          fontSize: 15,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Buscar" component={Search} options={{ headerShown: false }} />
      <Tab.Screen name="Pedidos" component={Pedidos} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
    </Tab.Navigator>


  );
}

export default function App() {
  const Tema = useTema()
  return (
    <ThemeProvider theme={Tema}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Drop'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='Config'
            component={Config}
          />
          <Stack.Screen
            name='Search'
            component={Search}
          />
          <Stack.Screen
            name='Mapa'
            component={Mapa}
          />
          <Stack.Screen
            name='Teste'
            component={Teste}
          />
          <Stack.Screen
            name='Login'
            component={Login}
          />
          <Stack.Screen
            name='Cadastro'
            component={Cadastro}
          />
          <Stack.Screen
            name='CadastroCliente'
            component={CadastroCliente}
          />
          <Stack.Screen
            name='ClienteRevisa'
            component={ClienteRevisa}
          />
          <Stack.Screen
            name='CadastroEmpresa'
            component={CadastroEmpresa}
          />
          <Stack.Screen
            name='EmpresaRevisa'
            component={EmpresaRevisa}
          />
          <Stack.Screen
            name='CadastroEntregador'
            component={CadastroEntregador}
          />
          <Stack.Screen
            name='EntregadorRevisa'
            component={EntregadorRevisa}
          />
          <Stack.Screen
            name='Afiliado'
            component={Afiliado}
          />
          <Stack.Screen
            name='Home'
            component={Tabs}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>

  );
}
