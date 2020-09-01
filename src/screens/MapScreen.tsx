import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ScreenOrientation from 'expo-screen-orientation';
// import Orientation from 'react-native-orientation';
import { DeviceMotion } from 'expo-sensors';
import { takeLeading } from 'redux-saga/effects';

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
  x: number;
  y: number;
}

const MapScreen = () => {
  let mapRef: MapView | null;
  const [currentLocation, setCurrentLocation] = useState<region>(initialState);
  const [locationResult, setLocationResult] = useState('');
  const [location, setLocation] = useState<coords>({
    latitude: -37.7123113,
    longitude: 144.5592334,
  });

  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener((e) =>
      console.log(e.orientationInfo.orientation)
    );
    DeviceMotion.isAvailableAsync().then(console.log);
    // ScreenOrientation.addOrientationChangeListener((listener) => {
    //   console.log(listener.orientationInfo.orientation);
    //   ScreenOrientation.lockAsync(
    //     data > 3 || (data > 0 && data < 0.5)
    //       ? ScreenOrientation.OrientationLock.LANDSCAPE
    //       : ScreenOrientation.OrientationLock.PORTRAIT
    //   );
    // });
    DeviceMotion.addListener((listener) => {
      const alpha = Math.abs(listener.rotation.alpha);
      DeviceMotion.setUpdateInterval(16);

      const orient =
        alpha > 3 || (alpha > 0 && alpha < 0.5) ? 'landscape' : 'portrait';

      if (orient !== orientation) {
        if (orient !== 'portrait') {
          setOrientation('landscape');
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );
        } else {
          setOrientation('portrait');
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
          );
        }
      }
      // ScreenOrientation.lockAsync(
      //   orient !== 'portrait'
      //     ? ScreenOrientation.OrientationLock.LANDSCAPE
      //     : ScreenOrientation.OrientationLock.PORTRAIT
      // );

      console.log(orient);
    });

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

    return () => {
      DeviceMotion.removeAllListeners();
      ScreenOrientation.removeOrientationChangeListeners();
    };
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
          // onUserLocationChange={(coordinate) =>
          //   console.log(coordinate.nativeEvent.coordinate)
          // }
          // onPanDrag={(coordinate) => console.log(coordinate.nativeEvent.coordinate)}
          onPress={(coordinate) => {
            // mapRef
            //   ?.coordinateForPoint({
            //     x: coordinate.nativeEvent.position?.x,
            //     y: coordinate.nativeEvent.position?.y,
            //   })
            //   .then((coords) => alert(coords.latitude))
            //   .catch((e) => alert(e));
            setLocation(coordinate.nativeEvent.coordinate);
            console.log(coordinate.nativeEvent.position);
            // setPosition(coordinate.nativeEvent.position);
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
