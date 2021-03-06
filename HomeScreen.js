import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {username: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.homeScreenText}>
          Start or Join a Walk
        </Text>
        <TextInput style={{height: 100, width: 200, fontSize: 20}} textAlign={'center'} placeholder="Enter your username"
          onChangeText={(username) => this.setState({username})}
          blurOnSubmit = {true}
        />
        <View style = {styles.buttonSpace}>
            <Button
              title="Enter"
              color ='white'
              onPress={() => this.props.navigation.navigate('RecommendationHome')}
            />
          </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeScreenText: {
    backgroundColor: 'gray',
    width: 375,
    height: 40,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonSpace: {
    marginTop: 10,
    color: 'white',
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 25,
  },
});

export default HomeScreen;
