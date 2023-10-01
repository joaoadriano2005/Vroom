import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken('pk.eyJ1IjoiZGF0YWV4cGxvcmVycyIsImEiOiJjbG1qOWc5MzMwMWZuMnNyeDZwczdibTdmIn0.xyo6WcixY-D5MiT2SfZj5Q');

export default function LocalCliente() {
    const [iconRotation, setIconRotation] = useState(0);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }
            const subscription = Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 5000,
                distanceInterval: 1,
            },
            (newLocation) => {
                if (location) {
                    const angle = calculateAngle(location.coords, newLocation.coords);
                    setIconRotation(angle);
                }
                setLocation(newLocation);
            });
            return () => subscription.remove();
        })();
    }, []);    
    function calculateAngle(coord1, coord2) {
        const deltaY = coord2.latitude - coord1.latitude;
        const deltaX = coord2.longitude - coord1.longitude;
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        return angle;
    } 
    const [location, setLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    }
    const [isExpanded, setIsExpanded] = useState(false);
    const url = 'https://figma.com/file/c97hMDfgLoFFWEAcetzH9C/TCC?type=design&node-id=0-1&mode=design&t=nfWUP24yYaj2kbHm-0';
    const displayUrl = isExpanded ? url : url.substring(0, 35) + '...';
    const [isMapExpanded, setIsMapExpanded] = useState(false);
    const handleMapPress = () => {
        setIsMapExpanded(!isMapExpanded);
    };
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
            scrollEnabled={!isMapExpanded}
        >
            <View style={styles.wrapper}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={styles.headerBell}>
                        <Icon name='notifications' size={30} color='#ffc000' />
                        <Icon name='alert-circle' size={20} color='#cf2e2e' style={styles.alertIcon} />
                    </TouchableOpacity>
                </View>


                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Entregas pendentes</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='time-outline' size={30} color='#000' />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                        </View>
                        <Text>
                            Luzia Hamburgers {'\n'}
                            Cd pedido: 01
                        </Text>
                    </View>
                    <View style={styles.locTitle}>
                        <Text style={{ fontSize: 18 }}>Ver localização do entregador</Text>
                        <Icon name='location-sharp' size={30} color='#000' />
                    </View>
                    <View style={[styles.map, isMapExpanded ? styles.expandedMap : {}]}>
                        <Mapbox.MapView
                            styleURL="mapbox://styles/dataexplorers/cln3p09nw06mh01ma53j17ayq"
                            style={styles.mapMap}
                            scrollEnabled={isMapExpanded}
                            onPress={handleMapPress}
                        >
                            <Mapbox.Camera
                                zoomLevel={14}
                                centerCoordinate={location ? [location.coords.longitude, location.coords.latitude] : [-46.678747, -24.122155]}
                                followUserMode="normal"
                            />
                            {location && (
                                <Mapbox.PointAnnotation
                                    id="userLocation"
                                    coordinate={[location.coords.longitude, location.coords.latitude]}
                                >
                                    <View style={[styles.customMarker, { transform: [{ rotate: `${iconRotation}deg` }] }]}>
                                        <Icon name="bicycle" size={30} color="#ffc000" />
                                    </View>
                                    <Mapbox.Callout title="Minha localização" />
                                </Mapbox.PointAnnotation>
                            )}
                        </Mapbox.MapView>
                    </View>
                    <View style={styles.deliveryTime}>
                        <Text>
                            Iniciou a entrega: 5min
                        </Text>
                    </View>
                    <View style={styles.recentsContent}>
                        <View style={styles.recentsImages}>
                        </View>
                        <Text>
                            Nome do entregador {'\n'}
                            Pedro
                        </Text>
                    </View>
                </View>
                <View style={styles.pedidos}>
                    <Text style={styles.pedidosText}>Histórico de pedidos</Text>
                    <View style={styles.pedidosClock}>
                        <Icon name='time-outline' size={30} color={'#000'} />
                    </View>
                </View>
                <View style={styles.recents}>
                    <View style={styles.recentsContainer}>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text style={styles.Text}>
                                Luzia Hamburgers {'\n'}
                                Ultimo pedido dia: 11/04/2023
                            </Text>
                        </View>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text style={styles.Text}>
                                Mix Shakes {'\n'}
                                Ultimo pedido dia: 09/04/2023
                            </Text>
                        </View>
                        <View style={styles.recentsContent}>
                            <View style={styles.recentsImages}>
                            </View>
                            <Text style={styles.Text}>
                                JusFarma {'\n'}
                                Ultimo pedido dia: 28/03/2023
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>Aviso</Text>
                        <TouchableOpacity
                            style={styles.modalHeaderClose}
                            onPress={() => setModalVisible(!modalVisible)} >
                            <Image source={require('../../../img/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.modalContentTitle}>
                            Você confirma que recebeu sua entrega?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                style={styles.modalBtn}>
                                <Text style={styles.modalContent}>
                                    Não
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.dispatch(StackActions.popToTop())}
                                style={styles.modalBtn}>
                                <Text style={styles.modalContent}>
                                    Sim
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
    },    
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',

    },
    header: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 30
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 70
    },
    headerBell: {
        marginLeft: '90%',
        position: 'relative',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertIcon: {
        position: 'absolute',
        top: -3,
        left: 13,
    },
    title: {
        fontSize: 20,
    },
    pedidos: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        justifyContent: 'center',
    },
    pedidosText: {
        fontSize: 20
    },
    pedidosClock: {
        marginLeft: 10
    },
    card: {
        backgroundColor: '#FFC000',
        width: '90%',
        borderRadius: 8,
        padding: 10,
        height: 'fit-content'
    },
    recents: {
        alignSelf: 'center',
        marginBottom: 30
    },
    recentsContent: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        elevation: 2,
        padding: 20,
        height: 80,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    recentsImages: {
        borderRadius: 50,
        backgroundColor: '#e5e5e5',
        width: 70,
        height: 70,
        marginRight: 10,
    },
    deliveryTime: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        height: 40,
        padding: 10,
        marginBottom: 15,
        alignSelf: 'center'
    },
    button: {
        height: 50,
        width: 250,
        backgroundColor: '#ffc000',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        elevation: 2,
        marginBottom: 15
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
    },
    modalContainer: {
        alignSelf: 'center',
        marginTop: '50%',
        width: 300,
        backgroundColor: '#f2f2f2',
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50
    },
    modalHeader: {
        backgroundColor: '#ffc000',
        width: '100%',
        height: 40,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    modalHeaderTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121212',
        textAlign: 'center',
    },
    modalHeaderClose: {
        justifyContent: 'flex-end',
    },
    modalContentTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    modalContent: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#121212'
    },
    modalBtn: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#ffc000',
        padding: 5,
        marginBottom: 20,
        alignSelf: 'center'
    },
    locTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    map: {
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden'
    },
    mapMap: {
        overflow: 'hidden',
        height: 350,
        marginBottom: 15,
        borderRadius: 10,
    },
    expandedMap: {
        elevation: 10
    },
})