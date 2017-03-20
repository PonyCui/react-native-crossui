/**
 * ActionSheet
 */

import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default class ActionSheet extends Component {

  constructor(props) {
    super(props);
    this.contentLayoutSetted = false;
    this.contentLayout = { height: 0.0 };
    this.maskAlpha = new Animated.Value(0.0);
    this.marginBottom = new Animated.Value(0.0);
    this.state = {
      show: false,
    }
  }

  show() {
    this.setState({
      show: true,
    }, () => {
      Animated.timing(this.maskAlpha, { toValue: 1.0, duration: 250 }).start();
      Animated.timing(this.marginBottom, { toValue: 0.0, duration: 250 }).start();
    });
  }

  onLayout(layout) {
    if (this.state.show === false) {
      this.contentLayout = layout;
      this.marginBottom.setValue(-this.contentLayout.height);
    }
  }

  render() {
    let items = [];
    if (this.props.buttonTitles instanceof Array) {
      items = this.props.buttonTitles.map((element, idx) => {
        return (
          <TouchableOpacity key={"i" + idx} style={styles.itemView}>
            <Text style={styles.itemTitle}>{element}</Text>
          </TouchableOpacity>
        )
      });
    }
    return (
      <Modal animationType="none" transparent={true} visible={this.state.show}>
        <Animated.View style={[styles.maskView, { opacity: this.maskAlpha }]}></Animated.View>
        <View style={styles.container}>
          <Animated.View onLayout={(layout) => { this.onLayout(layout) } }
            style={[styles.contentView, { marginBottom: this.marginBottom }]}>
            {items}
          </Animated.View>
        </View>
      </Modal>
    )
  }

}

let styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  maskView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000080",
  },
  contentView: {
    width: "100%",
    backgroundColor: "white",
  },
  itemView: {
    height: 50.0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "black",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
  }
})