import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DeviceMotion } from 'expo-sensors';

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

interface LatLng {
  latitude: number;
  longitude: number;
}

interface position {
  x: number;
  y: number;
}

enum OrientationEnum {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

const MapScreen = () => {
  let mapRef: MapView | null;
  const [currentLocation, setCurrentLocation] = useState<region>(initialState);
  const [locationResult, setLocationResult] = useState('');
  const [location, setLocation] = useState<coords>({
    latitude: -37.7123113,
    longitude: 144.5592334,
  });
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  const [orientation, setOrientation] = useState(OrientationEnum.PORTRAIT);

  useEffect(() => {
    /* Following code works fine detecting orientation. 
    Might be improved. */
    DeviceMotion.isAvailableAsync().then(console.log);
    DeviceMotion.addListener(async (listener) => {
      const alpha = Math.abs(listener.rotation.alpha);
      DeviceMotion.setUpdateInterval(2000);

      const orient =
        alpha > 3 || (alpha > 0 && alpha < 0.5)
          ? OrientationEnum.LANDSCAPE
          : OrientationEnum.PORTRAIT;

      if (orient !== orientation) {
        if (orient === OrientationEnum.PORTRAIT) {
          setOrientation(OrientationEnum.LANDSCAPE);
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );
          setWidth(Dimensions.get('window').width);
          setHeight(Dimensions.get('window').height);
          await ScreenOrientation.unlockAsync();
        } else {
          setOrientation(OrientationEnum.PORTRAIT);
          setWidth(Dimensions.get('window').width);
          setHeight(Dimensions.get('window').height);
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
          );
          await ScreenOrientation.unlockAsync();
        }
        console.log(orient);
      }
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

    /* following code is called only when app is exiting. Ideal for 
    removing the listeners. */
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
          style={{ width: width, height: height }}
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
          }}
          onPoiClick={(e) => {
            console.log(e.nativeEvent.name);
          }}
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
  // mapStyle: {
  //   width: width,
  //   height: height,
  // },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default MapScreen;
