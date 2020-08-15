import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AgeScreen = () => {
  const [age, setAge] = useState(0);

  return (
    <View>
      <Text>Age is: {age}</Text>
      <Button
        title='Increment'
        onPress={() => {
          setAge(age + 1);
        }}
      />
      <Button
        title='Decrement'
        onPress={() => {
          setAge(age - 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AgeScreen;
