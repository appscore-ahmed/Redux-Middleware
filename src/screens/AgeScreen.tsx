import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AgeScreen = () => {
  const [age, setAge] = useState(0);

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Age is: {age}</Text>
      <View style={styles.buttonStyle}>
        <Button
          title='Increment'
          onPress={() => {
            setAge(age + 1);
          }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Decrement'
          onPress={() => {
            setAge(age - 1);
          }}
        />
      </View>
    </View>
  );
};

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
});

export default AgeScreen;
