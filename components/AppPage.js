import React from 'react';
import { Keyboard } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Button, IconButton } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Common layout/logic for all app pages
export default function AppPage({ cancel, children, navigation, nested, onReturn, route, tab, theme }) {
  // References: https://stackoverflow.com/a/64249361 and https://stackoverflow.com/a/39772206
  const drawerOpen = navigation.toggleDrawer && useIsDrawerOpen();
  React.useEffect(() => { if (drawerOpen) Keyboard.dismiss() }, [drawerOpen]);

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
          headerLeft: () =>
            <IconButton name='menu' color={theme.colors.text} containerStyle={{ marginLeft: 25 }}
              onPress={() => navigation.openDrawer()} />,
          // Reference: https://stackoverflow.com/a/57502759
          headerRight: () =>
            isKeyboardVisible &&
              <IconButton name='keyboard-hide' color={theme.colors.text}
                containerStyle={{ marginRight: 25, marginTop: 5 }}
                onPress={() => Keyboard.dismiss()} />
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