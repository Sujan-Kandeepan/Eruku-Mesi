import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Divider } from "react-native-elements";

/**
 * This is the default construct for a class.
 * Code based off of: https://reactjs.org/docs/react-component.html
 */

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.view}>
        <ScrollView>
          <Text h3 style={styles.baseText}>
            Mission
          </Text>
          <Text style={styles.innerText}>
            Our mission for Eruku Community in North America is to re-kindle
            (strengthen, ignite, set ablaze, renew, re-start, stir) the spirit
            of community among Eruku sons and daughters, and their families in
            North America and around the world.
          </Text>

          <Text h3 style={styles.baseText}>
            Vision
          </Text>
          <Text style={styles.innerText}>
            Building a united force among the next generation of Eruku
            descendants in North America; Supporting each other in our quest for
            success through net­working; bringing quality and valuable resources
            to Eruku community, Nigeria.
          </Text>

          <Text h3 style={styles.baseText}>
            PREAMBLE AND OBJECTIVES WHEREAS,
          </Text>
          <Text style={styles.innerText}>
            We, indigenes of the City of Eruku, Kwara State, Nigeria residing in
            the United States of America and Canada, having come together to
            find ways of improving our welfare, and of contributing to the
            development of our dear town, Eruku, hereby agree to form Eruku
            Progressive Union, (EPU) North America Inc.
          </Text>
          <Divider style={{ backgroundColor: "green" }} />
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
    flex: 1
  },
  divider: {
    height: 3,
  },
});
