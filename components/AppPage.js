import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Common layout/logic for all app pages
export default function AppPage({ cancel, children, navigation, nested, onReturn, route, tab, theme }) {
    return (
    // Workaround for displaying header within drawer nav (framework limitation):
    // https://github.com/react-navigation/react-navigation/issues/1632#issuecomment-305291994
    <NavigationContainer style={SharedStyles.container} theme={theme} independent>
      <Stack.Navigator screenOptions={{ headerShown: !nested }}>
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
          }} children={() => // Display back button if nested, then children
            <>
              {nested && !tab &&
                <Button theme={theme} text={cancel ? 'Cancel' : 'Go Back'}
                  onPress={(...args) => { navigation.pop(); if (onReturn) onReturn(...args); }} />}
              {children}
            </>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}