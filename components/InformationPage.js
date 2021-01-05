import React from 'react';
import { Text, View, YellowBox } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import { Button, IconButton } from '../shared/SharedComponents';
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
          <Stack.Screen name={props.route.name} children={(localProps) =>
            // Without scroll view, bug exists where mobile keyboard closes if input field is too low
            // Ideally no nested scroll views (performance hit), but for small lists this is fine
            // Implementation with no warnings (bug persists which is fixed by nested scroll views):
            // https://nyxo.app/fixing-virtualizedlists-should-never-be-nested-inside-plain-scrollviews
            <ScrollView>
              {/* Reference: https://github.com/computerjazz/react-native-draggable-flatlist */}
              <DraggableFlatList scrollEnabled={false} data={pages} renderItem={({ drag, item }) =>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  {props.admin &&
                    <Text style={{ marginLeft: 5, marginRight: -15 }}>
                      <IconButton style={SharedStyles.icon} onLongPress={drag}
                        onPress={() => props.snackbar('Hold and drag to reorder list', 207)}
                        name='unfold-more' type='material' color={props.theme.colors.placeholder} />
                    </Text>}
                  {item === originalText ?
                    <>
                      <TextInput autoFocus autoCapitalize='words' style={{
                        backgroundColor: props.theme.colors.card,
                        color: props.theme.colors.text, flex: 1, height: 50,
                        marginBottom: 1, marginLeft: 15, marginTop: 15, textAlign: 'center'
                      }} value={editText} onChangeText={value => setEditText(value)} />
                      <Text style={{ marginHorizontal: 10 }}>
                        <IconButton style={SharedStyles.icon} onPress={() => {
                          if (pages.includes(editText) && originalText !== editText) {
                            props.snackbar('Duplicate sections not allowed', 224);
                            return;
                          }
                          setPages(pages.map(page => page === originalText ? editText : page));
                          setOriginalText('');
                          setEditText('');
                        }} name='check' type='material' color={props.theme.colors.accent} />
                        <IconButton style={SharedStyles.icon} onPress={() => {
                          setOriginalText('');
                          setEditText('');
                        }} name='undo' type='material' color={props.theme.colors.placeholder} />
                      </Text>
                    </> :
                    <>
                      <View style={{ flex: 1, marginRight: props.admin ? -15 : 'auto' }}>
                        <Button {...props} {...localProps} text={item}
                          onPress={() => localProps.navigation.push(item)} />
                      </View>
                      {props.admin &&
                        <Text style={{ marginHorizontal: 10 }}>
                          <IconButton style={SharedStyles.icon} onPress={() => {
                            setOriginalText(item);
                            setEditText(item);
                          }} name='edit' type='material' color={props.theme.colors.placeholder} />
                          <IconButton style={SharedStyles.icon}
                            onPress={() => props.snackbar('Press and hold to delete', 183)}
                            onLongPress={() => {
                              setPages(pages.filter(page => page !== item));
                          }} name='delete' type='material' color='darkred' />
                        </Text>}
                    </>}
                </View>}
                keyExtractor={item => `${item} ${item === originalText}`}
                onDragEnd={({ data }) => setPages(data)}
                // Reference: https://stackoverflow.com/questions/43397803/how-to-re-render-flatlist
                extraData={{ originalText, editText }} />
                {props.admin &&
                  <View style={{ marginBottom: 15 }}>
                    <Button {...props} text='Add Section'
                      onPress={() => {
                        if (pages.includes(newSection)) {
                          props.snackbar('Rename the previous new section first', 269);
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