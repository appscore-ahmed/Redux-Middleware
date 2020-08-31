import React, { useState, Component, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { takeLatest } from 'redux-saga/effects';

type latitude = number;
type longitude = number;

interface region {
  latitude: latitude;
  longitude: longitude;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface coords {
  latitude: latitude;
  longitude: longitude;
}

const initialState = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = () => {
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState<region>(initialState);
  const [locationResult, setLocationResult] = useState('');
  const [location, setLocation] = useState<coords>({
    latitude: -37.7123113,
    longitude: 144.5592334,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const _position = position.coords;
        setLocationResult(JSON.stringify(_position));
        const { latitude, longitude } = _position;
        setCurrentLocation({ ...currentLocation, latitude, longitude });
      },
      (error) => alert(error.message),
      { timeout: 20000, maximumAge: 1000 }
    );
    // _getLocationAsync();
  }, []);

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setLocationResult('Permission to access location was denied');
      setLocation(location);
      console.log(location);
    }
    let newLocation = await Location.getCurrentPositionAsync();
    setLocationResult(JSON.stringify(newLocation));
    setLocation(newLocation.coords);
    console.log(newLocation);
  };

  return (
    <View style={styles.container}>
      {currentLocation.latitude ? (
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={setCurrentLocation}
          showsUserLocation
          // onUserLocationChange={(coordinate) =>
          //   console.log(coordinate.nativeEvent.coordinate)
          // }
          // onPanDrag={(coordinate) => console.log(coordinate.nativeEvent.coordinate)}
          onPress={(coordinate) => {
            setLocation(coordinate.nativeEvent.coordinate);
            console.log(coordinate.nativeEvent.coordinate);
          }}
          onPoiClick={(e) => {
            console.log(e.nativeEvent.name);
          }}
          // showsMyLocationButton
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={(e) => console.log(e.nativeEvent.position)}
          />
        </MapView>
      ) : (
        <ActivityIndicator style={{ flex: 1 }} animating size='large' />
      )}
      {/* <Text>Location: {locationResult}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#ecf0f1',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default MapScreen;
