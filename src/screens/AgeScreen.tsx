import React, { useState, Dispatch } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

interface Age {
  age: number;
  ageUp: () => void;
  ageDown: () => void;
}

const AgeScreen = (props: Age) => {
  const [age, setAge] = useState(0);

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Age is: {age}</Text>
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

const mapDispathToProps = (dispatch: any) => {
  return {
    ageUp: () => {
      dispatch({ type: 'INCREMENT' });
    },
    ageDown: () => {
      dispatch({ type: 'DECREMENT' });
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
  return { age: state.age };
};

export default connect(mapStateToProps, mapDispathToProps)(AgeScreen);
