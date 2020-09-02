import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  Platform,
} from 'react-native';

import * as actionCreator from '../store/actions/actions';
import results from '../type/AgeType';

import firebase from 'firebase';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { useNavigation } from '../hooks/useNavigation';

interface Age {
  age: number;
  name: string;
  random: results;
  displayName: () => void;
  ageUp: () => void;
  ageDown: () => void;
  fetcher: () => void;
  sendNotification: () => void;
}

const addToFirebaseDatabase = async () => {
  const firebaseObject = firebase.database().ref('/');
  var key: string | null = firebaseObject.push().key;
  console.log(key);
  if (key !== null) await firebaseObject.child(key).set({ name: 'test' });
};

type navigation = NavigationScreenProp<NavigationState, NavigationParams>;

const navigateTo = (navigation: navigation, route: string) => {
  navigation.navigate(route);
};

const AgeScreen = (props: Age) => {
  const navigation = useNavigation();
  const [age, setAge] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');

  const getToken = () => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
  };

  useLayoutEffect(() => {
    getToken();

    firebase
      .database()
      .ref('/db')
      .on('child_added', async (data) => {
        console.log(data);
        if (expoPushToken) await sendPushNotification(expoPushToken);
      });
  }, []);

  // firebase
  //   .database()
  //   .ref('/')
  //   .on('child_added', (data) => {
  //     console.log(data);
  //     sendPushNotification(expoPushToken);
  //   });

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Age is: {props.age}</Text>
      <View style={styles.buttonStyle}>
        <Button
          title='Increment'
          onPress={() => {
            props.ageUp();
            console.log(props.age);
            setAge(props.age);
          }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Decrement'
          onPress={() => {
            props.ageDown();
            setAge(props.age);
          }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='fetch Data'
          onPress={() => {
            props.fetcher();
            console.log(props.random);
          }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Open Map'
          onPress={() => {
            navigateTo(navigation, 'Map');
          }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Send Notification'
          onPress={async () => {
            if (expoPushToken) await sendPushNotification(expoPushToken);
          }}
        />
      </View>
      <View>
        <FlatList
          data={Object.values(props.random)}
          horizontal
          keyExtractor={(item, index) => item.email}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatListStyle}>
                {!!item.name ? (
                  <>
                    <Image
                      source={{ uri: item.picture['large'] }}
                      style={{ width: 200, height: 200 }}
                    />
                    <Text>{item.gender}</Text>
                    <Text>
                      {item.name['first']}
                      {item.name['last']}
                    </Text>
                  </>
                ) : null}
              </View>
            );
          }}
          initialNumToRender={1}
        />
      </View>
    </View>
  );
};

async function sendPushNotification(expoPushToken: string) {
  console.log('token is: ');
  console.log(expoPushToken);
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' },
  };

  console.log(message);

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  // } else {
  // console.log('no token available');
  // }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      console.log('granted');
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  flatListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    ageUp: () => {
      // dispatch(actionCreator.ageUp(2));
      dispatch({ type: 'INCREMENT', payload: 2 });
    },
    ageDown: () => {
      dispatch(actionCreator.ageDown(2));
    },
    displayName: () => {
      dispatch({ type: 'NAME', payload: 'Ahmed' });
    },
    fetcher: () => {
      dispatch(actionCreator.fetchRandomUsers());
    },
    sendNotification: () => {
      dispatch(actionCreator.addToFirebaseDatabase());
    },
  };
};

const mapStateToProps = (state: Age) => {
  return { age: state.age, name: state.name, random: state.random };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgeScreen);
