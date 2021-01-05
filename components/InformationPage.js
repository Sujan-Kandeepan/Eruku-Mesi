import React from 'react';
import { FlatList, StyleSheet, Text, View, YellowBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function InformationPage(props) {
  const [pages, setPages] = React.useState(['General', 'About Us', 'History', 'Contact']);
  const [originalText, setOriginalText] = React.useState('');
  const [editText, setEditText] = React.useState('');
  const newSection = 'New Section';
  // Ignore warnings about nested ScrollViews (small list, not to worry) and YellowBox itself
  React.useEffect(() => YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'YellowBox has been replaced with LogBox'
  ]), []);
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Selection Page' children={(localProps) =>
            // Without scroll view, bug exists where mobile keyboard closes if input field is too low
            // Ideally no nested scroll views (performance hit), but for small lists this is fine
            // Implementation with no warnings (bug persists which is fixed by nested scroll views):
            // https://nyxo.app/fixing-virtualizedlists-should-never-be-nested-inside-plain-scrollviews
            <ScrollView>
              <FlatList scrollEnabled={false} data={pages} renderItem={({ item }) =>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  {item === originalText ?
                    <>
                      <TextInput autoFocus style={{
                        backgroundColor: props.theme.colors.card,
                        color: props.theme.colors.text, flex: 1, height: 50,
                        marginBottom: 1, marginLeft: 15, marginTop: 15, textAlign: 'center'
                      }} value={editText} onChangeText={value => setEditText(value)} />
                      <Text style={{ marginHorizontal: 10 }}>
                        <TouchableOpacity style={styles.icon} onPress={() => {
                          if (pages.includes(editText) && originalText !== editText) {
                            props.snackbar('Duplicate sections not allowed', 224);
                            return;
                          }
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
                          <TouchableOpacity style={styles.icon}
                            onPress={() => props.snackbar('Press and hold to delete', 183)}
                            onLongPress={() => {
                              setPages(pages.filter(page => page !== item));
                            }}>
                            <Icon name='delete' type='material' color='darkred' />
                          </TouchableOpacity>
                        </Text>}
                    </>}
                </View>}
                keyExtractor={item => `${item} ${item === originalText}`}
                // Reference: https://stackoverflow.com/questions/43397803/how-to-re-render-flatlist
                extraData={{ originalText, editText }} />
                {props.admin &&
                  <View style={{ marginBottom: 15 }}>
                    <Button {...props} text='Add Section'
                      onPress={() => {
                        if (pages.includes(newSection)) {
                          props.snackbar('Attempting to add multiple new sections', 284);
                          return;
                        }
                        setPages([...pages, newSection]);
                        setOriginalText(newSection);
                        setEditText(newSection);
                      }} />
                    </View>}
              </ScrollView>} />
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