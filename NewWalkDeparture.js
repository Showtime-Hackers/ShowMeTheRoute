import React from 'react';
import { Animated, Button, Dimensions, Picker, TouchableHighlight, Platform, StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';

const { width: WindowWidth } = Dimensions.get('window');

const LOCATIONS = [
  {location: 'Dorms: Unit 1', geocord: '37.8681105,-122.2572183'},
  {location: 'Dorms: Unit 2', geocord: '37.8662205,-122.2570303'},
  {location: 'Dorms: Unit 3/Blackwell Hall', geocord: '37.8671245,-122.2625354'},
  {location: 'Dorms: Foothill', geocord: '37.8749058,-122.2573667'},
  {location: 'Dorms: Bowles Hall', geocord: '37.8733996,-122.2552113'},
  {location: 'Dorms: Channing-Bowditch', geocord: '37.8674597,-122.2594784'},
  {location: 'Downtown Berkeley BART', geocord: '37.8700973,-122.2703359'},
  {location: 'North Gate Hall', geocord: '37.8749998,-122.2618571'},
  {location: 'Sproul Plaza', geocord: '37.8695385,-122.261525'}
];

class NewWalkScreenDeparture extends React.Component {
  static navigationOptions = {
    title: 'Select Time',
  };

  constructor(props) {
    super(props);
    this.state = {
      from: 'California Memorial Stadium',
      to: '---',
      departure: new Date(),
      modalIsVisible: false,
      modalIsVisible2: false,
      modalAnimatedValue: new Animated.Value(0),
      modalAnimatedValue2: new Animated.Value(0),
    };
    this.setDestination = this.setDestination.bind(this);
    this.setDateTime = this.setDateTime.bind(this);
  }

  _handlePressDone() {
    Animated.timing(this.state.modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ modalIsVisible: false });
    });
  };

  _handlePressDone2() {
    Animated.timing(this.state.modalAnimatedValue2, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ modalIsVisible2: false });
    });
  };

  _handlePressOpen() {
    if (this.state.modalIsVisible) {
      return;
    }

    this.setState({ modalIsVisible: true }, () => {
      Animated.timing(this.state.modalAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  _handlePressOpen2() {
    if (this.state.modalIsVisible2) {
      return;
    }

    this.setState({ modalIsVisible2: true }, () => {
      Animated.timing(this.state.modalAnimatedValue2, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  setDestination(destination) {
    this.setState({to: destination});
  }

  setDateTime(dateTime) {
    this.setState({departure: dateTime})
  }

  _maybeRenderModal() {
    if (!this.state.modalIsVisible) {
      return null;
    }

    const { modalAnimatedValue } = this.state;
    const opacity = modalAnimatedValue;
    const translateY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });
    var choices = LOCATIONS.map(function(item, index) {
      return <Picker.Item key={index} label={item.location} value={item.location}/>
    });

    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={this.state.modalIsVisible ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={this._handlePressDone}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateY }],
          }}>
          <View style={styles.toolbar}>
            <View style={styles.toolbarRight}>
              <Button title="Done" onPress={this._handlePressDone} />
            </View>
          </View>
          <Picker
            style={{ width: WindowWidth, backgroundColor: '#e1e1e1' }}
            selectedValue={this.state.to}
            onValueChange={this.setDestination}>
            {choices}
          </Picker>
        </Animated.View>
      </View>
    );
  }

  _maybeRenderModal2() {
    if (!this.state.modalIsVisible2) {
      return null;
    }

    const { modalAnimatedValue } = this.state;
    const opacity = modalAnimatedValue;
    const translateY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={this.state.modalIsVisible2 ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={this._handlePressDone2}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateY }],
          }}>
          <View style={styles.toolbar}>
            <View style={styles.toolbarRight}>
              <Button title="Done" onPress={this._handlePressDone2} />
            </View>
          </View>
          <DatePickerIOS
            date={this.state.departure}
            onDateChange={this.setDateTime}
          />
        </Animated.View>
      </View>
    );
  }
  render() {
    return (
      <View style = {styles.container}>
        <Text> From: {this.state.from} </Text>
        <Text> Where are heading? </Text>
        <TouchableHighlight onPress={ this._handlePressOpen }>
          <Text> {this.state.to} </Text>
        </TouchableHighlight>
        <Text> When are going? </Text>
        <TouchableHighlight onPress={ this._handlePressOpen2 }>
          <Text> {this.state.departure.toTimeString()} </Text>
        </TouchableHighlight>
        {this._maybeRenderModal()}
        {this._maybeRenderModal2()}
        <View style = {styles.buttonContainer}>
          <Button
            title="Request"
            color="white"
            onPress={() => this.props.navigation.navigate('Confirmation')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 100,
    width: 100,
    height: 40,
    backgroundColor: 'black',
    flexDirection: 'row',
    borderRadius: 25,
    justifyContent: 'center'
  },
  createWalkStyle: {
    fontSize: 50,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  toolbar: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  toolbarRight: {
    alignSelf: 'flex-end',
  },
});

export default NewWalkScreenDeparture;
