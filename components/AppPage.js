import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import styles from '../shared/styles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Common layout/logic for all app pages
export default function AppPage({ children, navigation, route, theme }) {
    return (
    // Workaround for displaying header within drawer nav (framework
    // limitation):
    // https://github.com/react-navigation/react-navigation/issues/1632#issuecomment-305291994
    <NavigationContainer style={styles.container} theme={theme} independent>
      <Stack.Navigator>
        <Stack.Screen name={route.name} options={{
          headerLeft: () =>
            // Display hamburger icon with workaround for padding bug in library
            <View>
              <Text style={{ fontSize: 4 }}></Text>
              <Text>
                {'       '}
                <Icon name='menu' color='grey' style={{ paddingTop: 5 }}
                  onPress={() => navigation.openDrawer()} />
              </Text>
            </View>
        }}>
          {/* Display component children */}
          {() => children}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}