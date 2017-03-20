/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import ActionSheet from './src/ActionSheet'

export default class react_native_crossui extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.refs.actionSheet.show();
        }}>
          <Text>ActionSheet</Text>
        </TouchableOpacity>
        <ActionSheet ref="actionSheet" buttonTitles={["推荐给朋友", "举报内容", "不再关注"]} dangerIndex={2} onSelected={(idx) => {console.log(idx)}} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('react_native_crossui', () => react_native_crossui);
