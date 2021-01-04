import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function InformationPage(props) {
  const [pages, setPages] = React.useState(['General', 'About Us', 'History', 'Contact']);
  const [originalText, setOriginalText] = React.useState('');
  const [editText, setEditText] = React.useState('');
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Selection Page' children={(localProps) =>
            <FlatList data={pages} renderItem={({ item }) =>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {item === originalText ?
                  <>
                    <TextInput style={{
                      backgroundColor: props.theme.colors.card,
                      color: props.theme.colors.text, flex: 1, height: 50,
                      marginBottom: 1, marginLeft: 15, marginTop: 15, textAlign: 'center'
                    }} value={editText} onChangeText={value => setEditText(value)} />
                    <Text style={{ marginHorizontal: 10 }}>
                      <TouchableOpacity style={styles.icon} onPress={() => {
                        setPages(pages.map(page => page === originalText ? editText : page));
                        setOriginalText('');
                        setEditText('');
                      }}>
                        <Icon name='check' type='material' color={props.theme.colors.accent} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.icon} onPress={() => {
                        setOriginalText('');
                        setEditText('');
                      }}>
                        <Icon name='undo' type='material' color={props.theme.colors.placeholder} />
                      </TouchableOpacity>
                    </Text>
                  </> :
                  <>
                    <View style={{ flex: 1, marginRight: props.admin ? -15 : 'auto' }}>
                      <Button {...props} {...localProps} text={item}
                        onPress={() => localProps.navigation.push(item)} />
                    </View>
                    {props.admin &&
                      <Text style={{ marginHorizontal: 10 }}>
                        <TouchableOpacity style={styles.icon} onPress={() => {
                          setOriginalText(item);
                          setEditText(item);
                        }}>
                          <Icon name='edit' type='material' color={props.theme.colors.placeholder} />
                        </TouchableOpacity>
                      </Text>}
                  </>}
              </View>}
              keyExtractor={item => `${item} ${item === originalText}`}
              // Reference: https://stackoverflow.com/questions/43397803/how-to-re-render-flatlist
              extraData={{ originalText, editText }} />} />
          {pages.map(page =>
            <Stack.Screen key={page} name={page} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => localProps.navigation.push(`Edit ${page}`)} />}
                <View style={SharedStyles.container}>
                  <Text style={{ color: props.theme.colors.text }}>{localProps.route.name}</Text>
                </View>
              </AppPage>} />)}
          {props.admin && pages.map(page => `Edit ${page}`).map(page =>
            <Stack.Screen key={page} name={page} children={(localProps) =>
              <EmptyPage {...props} {...localProps} nested cancel />} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 15
  }
});