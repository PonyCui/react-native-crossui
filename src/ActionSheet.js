/**
 * ActionSheet
 */

import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

const kItemViewHeight = 55.0;

export default class ActionSheet extends Component {

  constructor(props) {
    super(props);
    this.contentLayoutSetted = false;
    this.contentLayout = { height: 0.0 };
    this.maskAlpha = new Animated.Value(0.0);
    this.translateY = new Animated.Value(this.contentHeight());
    this.state = {
      show: false,
    }
  }

  contentHeight() {
    return (this.props.buttonTitles.length + 1) * kItemViewHeight
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (this.state.show === false) {
      this.translateY.setValue(this.contentHeight());
    }
  }

  show() {
    this.setState({
      show: true,
    }, () => {
      Animated.timing(this.maskAlpha, { toValue: 1.0, duration: 250 }).start();
      Animated.spring(this.translateY, { bounciness: 1.0, speed: 40.0, toValue: 0.0 }).start();
    });
  }

  dismiss(cb) {
    Animated.timing(this.maskAlpha, { toValue: 0.0, duration: 250 }).start(() => {
      this.setState({ show: false }, () => {
        cb.call();
      });
    });
    Animated.spring(this.translateY, { bounciness: 1.0, speed: 40.0, toValue: this.contentHeight() }).start();
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
          <TouchableHighlight underlayColor="#f2f2f2" onPress={() => { this.dismiss(() => {this.props.onSelected(idx);}); }} key={"i" + idx} style={styles.itemView}>
            <Text style={idx === this.props.dangerIndex ? styles.itemDangerTitle : styles.itemTitle}>{element}</Text>
          </TouchableHighlight>
        )
      });
    }
    return (
      <Modal animationType="none" transparent={true} visible={this.state.show}>
        <Animated.View style={[styles.maskView, { opacity: this.maskAlpha }]} pointerEvents="none" />
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => { this.dismiss(() => {if (this.onCancelled instanceof Function) { this.onCancelled() }}) }}><View style={{flex: 1}} /></TouchableWithoutFeedback>
          <Animated.View onLayout={(layout) => { this.onLayout(layout) }}
            style={[styles.contentView, { transform: [{ translateY: this.translateY }] }]}>
            {items}
            <TouchableHighlight underlayColor="#f2f2f2" onPress={() => { this.dismiss(() => {if (this.onCancelled instanceof Function) { this.onCancelled() }}); }} style={styles.cancelView}>
              <Text style={styles.cancelTitle}>{this.props.cancelTitle}</Text>
            </TouchableHighlight>
          </Animated.View>
        </View>
      </Modal>
    )
  }

}

ActionSheet.propTypes = {
  buttonTitles: React.PropTypes.array.isRequired,
  cancelTitle: React.PropTypes.string,
  dangerIndex: React.PropTypes.number,
  onSelected: React.PropTypes.func.isRequired,
  onCancelled: React.PropTypes.func,
};

ActionSheet.defaultProps = {
  cancelTitle: "取消",
  dangerIndex: -1,
};

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
    backgroundColor: "#00000050",
  },
  contentView: {
    width: "100%",
    backgroundColor: "white",
  },
  itemView: {
    height: kItemViewHeight,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dcdcdc",
    backgroundColor: "white",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333333",
  },
  itemDangerTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#e04d2c",
  },
  cancelView: {
    height: kItemViewHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  cancelTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#999999",
  },
})