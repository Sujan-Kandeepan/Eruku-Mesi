import React from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Button, IconButton } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Common layout/logic for all app pages, accept some props for slight customization/variance
export default function AppPage({ cancel, children, navigation, nested, onReturn, route, scroll, tab, theme }) {
  // Monitor drawer state (check for toggleDrawer function to see if exists) and close keyboard whenever opened
  // References: https://stackoverflow.com/a/64249361 and https://stackoverflow.com/a/39772206
  const drawerOpen = navigation.toggleDrawer && useIsDrawerOpen();
  React.useEffect(() => { if (drawerOpen) Keyboard.dismiss() }, [drawerOpen]);

  // Track state of keyboard and update state variable affecting keyboard and drawer
  // Reference: https://stackoverflow.com/a/57502759
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    // Workaround for displaying header within drawer nav (framework limitation):
    // https://github.com/react-navigation/react-navigation/issues/1632#issuecomment-305291994
    <NavigationContainer style={SharedStyles.container} theme={theme} independent>
      <Stack.Navigator screenOptions={{ headerShown: !nested }}>
        <Stack.Screen name={route.name} options={{
          // Hamburger icon on left of page header to open drawer
          headerLeft: () =>
            <IconButton name='menu' color={theme.colors.text} containerStyle={{ marginLeft: 25 }}
              onPress={() => navigation.openDrawer()} />,
          // Keyboard close icon on right of page header to close keyboard if open
          // Helpful especially on iOS which doesn't seem to have a dedicated button
          headerRight: () =>
            isKeyboardVisible &&
              <IconButton name='keyboard-hide' color={theme.colors.text}
                containerStyle={{ marginRight: 25, marginTop: 5 }}
                onPress={() => Keyboard.dismiss()} noFeedback />
        }} children={() => // Display back/cancel button if needed, then children
          <>
            {nested && !tab &&
              <Button theme={theme} text={cancel ? 'Cancel' : 'Go Back'}
                // Optionally specify callback function for return button
                onPress={(...args) => { navigation.pop(); if (onReturn) onReturn(...args); }} />}
            {/* Reference: https://github.com/facebook/react-native/issues/4099#issuecomment-307541206 */}
            {scroll ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</ScrollView> : children}
          </>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}