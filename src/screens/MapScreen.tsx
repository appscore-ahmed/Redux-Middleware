import React, { useState, Component, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Point } from 'react-native-maps';
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

export interface LatLng {
  latitude: number;
  longitude: number;
}

interface position {
  x: number | undefined;
  y: number | undefined;
}

const MapScreen = () => {
  let mapRef: MapView | null;
  const [currentLocation, setCurrentLocation] = useState<region>(initialState);
  const [locationResult, setLocationResult] = useState('');
  const [location, setLocation] = useState<coords>({
    latitude: -37.7123113,
    longitude: 144.5592334,
  });

  const [position, setPosition] = useState<position>();

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
  }, []);

  return (
    <View style={styles.container}>
      {currentLocation.latitude ? (
        <MapView
          provider='google'
          ref={(ref) => {
            mapRef = ref;
          }}
          style={styles.mapStyle}
          initialRegion={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={setCurrentLocation}
          showsUserLocation
          onLayout={() =>
            // mapRef?.pointForCoordinate({
            //   latitude: location.latitude,
            //   longitude: location.longitude,
            // })
            mapRef?.coordinateForPoint({ x: position?.x, y: position?.y })
          }
          // onUserLocationChange={(coordinate) =>
          //   console.log(coordinate.nativeEvent.coordinate)
          // }
          // onPanDrag={(coordinate) => console.log(coordinate.nativeEvent.coordinate)}
          onPress={(coordinate) => {
            setLocation(coordinate.nativeEvent.coordinate);
            console.log(coordinate.nativeEvent.position);
            setPosition(coordinate.nativeEvent.position);
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
