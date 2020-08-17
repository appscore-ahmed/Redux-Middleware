import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

interface Age {
  age: number;
  name: string;
  displayName: () => void;
  ageUp: () => void;
  ageDown: () => void;
}

const AgeScreen = (props: Age) => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState('');
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Age is: {age}</Text>
      <Text style={styles.textStyle}>Name is: {props.name}</Text>
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
          title='Display Name'
          onPress={() => {
            props.displayName();
            // console.log(props.name);
            setName(props.name);
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    ageUp: () => {
      dispatch({ type: 'INCREMENT', payload: 2 });
    },
    ageDown: () => {
      dispatch({ type: 'DECREMENT', payload: 3 });
    },
    displayName: () => {
      dispatch({ type: 'NAME', payload: 'Ahmed' });
    },
  };
  //   ageUp: () => {
  //     ({ type: 'INCREMENT' });
  //   },
  //   ageDown: () => {
  //     ({ type: 'DECREMENT' });
  //   },
};

const mapStateToProps = (state: Age) => {
  return { age: state.age, name: state.name };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgeScreen);
