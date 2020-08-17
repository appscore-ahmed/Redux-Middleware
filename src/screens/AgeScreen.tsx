import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList } from 'react-native';

import * as actionCreator from '../store/actions/actions';
import results from '../type/AgeType';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface Age {
  age: number;
  name: string;
  random: results;
  displayName: () => void;
  ageUp: () => void;
  ageDown: () => void;
  fetcher: () => void;
}

const AgeScreen = (props: Age) => {
  const [age, setAge] = useState(0);

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
            // console.log(props.name);
            // setName(props.random);
            console.log(props.random);
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
      dispatch(actionCreator.ageUp(2));
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
  };
};

const mapStateToProps = (state: Age) => {
  return { age: state.age, name: state.name, random: state.random };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgeScreen);
