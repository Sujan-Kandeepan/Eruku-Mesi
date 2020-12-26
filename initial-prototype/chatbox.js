import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Text } from "react-native-elements";

/**
 * This is the default construct for a class.
 * Code based off of: https://reactjs.org/docs/react-component.html
 */

export default class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ["Hi! How can I help you? Ask me about nearby upcoming events!"],
      message: "",
    };

    this.appendMessage = this.appendMessage.bind(this);
  }

  appendMessage = () => {
    this.state.messages.push(this.state.message);
    this.setState({
      message: "",
    });
  };

  render() {
    const { message, messages } = this.state;
    const renderMessages = messages.map((message, i) => {
      return (
        <View key={i} style={styles.message}>
          <Text>
            <Text style={styles.user}>Blogger: </Text> {message}
          </Text>
        </View>
      );
    });
    return (
      <View style={styles.MainContainer}>
        {renderMessages}
        <View style={styles.bottom}>
          <Input
            placeholder="TYPE MESSAGE"
            rightIcon={{
              type: "font-awesome",
              name: "paper-plane",
              onPress: this.appendMessage,
            }}
            value={message}
            onChangeText={(message) => this.setState({ message })}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  user: {
    fontWeight: "bold",
  },
  innerText: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  view: {
    padding: 15,
    flex: 1,
  },
  MainContainer: {
    flex: 1,
  },
  message: {
    backgroundColor: "rgba(145, 201, 116, 0.3)",
    color: "red",
  },
  bottom: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
});
