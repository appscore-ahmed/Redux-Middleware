import React, { useState } from 'react';
import { Button, View, StyleSheet, FlatList } from 'react-native';

export const fetchDataFromApi = (/* setResult: (result: string) => void */) => {
  var page = 1;
  fetch(`https://randomuser.me/api/?results=10&page=${page}`)
    .then((response) => response.json())
    .then((responseJson: string) => {
      /* setResult(responseJson); */
      return responseJson;
    })
    .catch((error) => {
      console.log('Error selecting random data: ' + error);
    });
};

const TestScreen = () => {
  const [result, setResult] = useState<string>('');

  return (
    <View style={styles.buttonStyle}>
      <Button
        title='fetch Data'
        onPress={() => {
          fetchDataFromApi(setResult);
          console.log(result);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default TestScreen;

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);
