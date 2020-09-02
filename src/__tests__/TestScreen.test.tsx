import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
// import { sum } from '../screens/TestScreen';
import TestScreen from '../screens/TestScreen';

test('snapshot',  () => {
  const tree = renderer.create(<TestScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

/* test case works */
// test('it works', () => {
//   expect(true).toBeTruthy();
// });

// test('no param sum', () => {
//   expect(sum()).toBe(0);
// });

// test('with 2 number param sum', async () => {
//   expect(sum(2, 3)).toBe(5);
// }, 100);

// test('with negative number param sum', () => {
//   expect(sum(-2, 1)).toBe(-1);
// });

// test('fetcher', () => {
//   const fetchDataFromApi = jest.fn(() => 2);
//   expect(fetchDataFromApi()).toBe(2);
// });
