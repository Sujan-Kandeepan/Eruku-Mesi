import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import MediaContentForm from './MediaContentForm';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function MediaContentPage(props) {
  const pages = {
    postMediaContent: 'Post Media Content'
  };
  const posts = [...Array(10).keys()].map(n =>
    ({ id: n + 1, title: `Post ${n + 1}`, description: `Post ${n + 1} description` }));
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Media Content Feed' children={(localProps) =>
            <FlatList data={posts} renderItem={({ item }) =>
              <TouchableOpacity onPress={() => console.log(`View ${item.title}`)}>
                <Card containerStyle={{
                  borderColor: props.theme.colors.border,
                  backgroundColor: props.theme.colors.card
                }}>
                  <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: props.theme.colors.text }}>
                    {item.description}
                  </Text>
                </Card>
              </TouchableOpacity>
            } keyExtractor={item => item.title}
              ListHeaderComponent={props.admin &&
                <Button {...props} {...localProps} text={pages.postMediaContent}
                  onPress={() => localProps.navigation.push(pages.postMediaContent)} />}
              ListFooterComponent={<View style={{ height: 15 }} />} />} />
          {props.admin &&
            <Stack.Screen name={pages.postMediaContent} children={(localProps) =>
              <MediaContentForm {...props} {...localProps} />} />}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};