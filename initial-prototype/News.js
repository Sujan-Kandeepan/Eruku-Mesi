import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-elements";

/**
 * This is the default construct for a class.
 * Code based off of: https://reactjs.org/docs/react-component.html
 */

export default class News extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.view}>
        <ScrollView>
          <Text h3 style={styles.baseText}>
            Announcements
          </Text>
          <Text style={styles.innerText}>
            Please stay Safe during this pandemic! 
          </Text>
          <Text h3 style={styles.baseText}>
            Holidays
          </Text>
          <Text style={styles.innerText}>
            58 more days until Christmas celebration!
          </Text>
          <Text h3 style={styles.baseText}>
            Upcoming Events
          </Text>
          <Text style={styles.innerText}>
            Join us for the 2019 Reunion In Maryland! Details will be posted soon!
          </Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  baseText: {
    fontWeight: "bold",
    color: "green",
    textDecorationLine: "underline",
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
  divider: {
    height: 3,
  },
});
