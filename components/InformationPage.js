import React from 'react';
import { Dimensions, Keyboard, Platform, Text, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { TextInput } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import { addInfoSection, deleteInfoSection, editInfoContent, editInfoSection, fetchInformation }
  from './functions/InformationFunctions';
import { BodyInput, Button, Content, IconButton, Media, MediaPicker } from '../shared/SharedComponents';
import { periodic } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Page for displaying informational content under a modifiable list of sections
export default function InformationPage(props) {
  // State variables for dynamic page information (two-way data binding)
  const [pages, setPages] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [originalText, setOriginalText] = React.useState('');
  const [editText, setEditText] = React.useState('');
  const [imageTop, setImageTop] = React.useState(null);
  const [imageBottom, setImageBottom] = React.useState(null);
  const [fetched, setFetched] = React.useState(false);
  const newSection = 'New Section';
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  periodic(() => fetchInformation(props, setPages, setData, () => setFetched(true)));
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <View style={{ height: Platform.OS !== 'web' && originalText.length
              ? Dimensions.get('window').height / 2 : '100%' }}>
              {!fetched &&
                <Text style={{ color: props.theme.colors.text, marginTop: 15, textAlign: 'center' }}>
                  Loading information...
                </Text>}
              {/* Draggable version of FlatList displaying individual sections with options */}
              {/* Reference: https://github.com/computerjazz/react-native-draggable-flatlist */}
              <DraggableFlatList data={pages} renderItem={({ drag, item }) =>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  {props.admin &&
                    <Text style={{ marginLeft: 5, marginRight: -15 }}>
                      <IconButton style={SharedStyles.icon}
                        onPress={() => props.snackbar('Hold and drag to reorder list')}
                        onLongPress={() => originalText === ''
                          ? drag() : props.snackbar('Save changes before reordering')}
                        name='unfold-more' type='material' color={props.theme.colors.placeholder} />
                    </Text>}
                  {/* Inline edit interface for section name */}
                  {props.admin && item === originalText ?
                    <>
                      {/* Text input for new section name */}
                      <TextInput autoFocus autoCapitalize='words' style={{
                        backgroundColor: props.theme.colors.card,
                        borderColor: props.theme.colors.border, borderWidth: 1,
                        color: props.theme.colors.text, flex: 1, height: 50,
                        marginBottom: 1, marginLeft: 15, marginTop: 15, textAlign: 'center'
                      }} value={editText} onChangeText={value => setEditText(value)}
                      onBlur={Keyboard.dismiss} />
                      <Text style={{ marginHorizontal: 10 }}>
                        {/* Save changes and update state/data */}
                        <IconButton style={SharedStyles.icon}
                          onPress={() => editInfoSection(props, pages, setPages,
                            data, setData, originalText, setOriginalText, editText, setEditText)}
                          name='check' type='material' color={props.theme.colors.accent} />
                        {/* Discard changes and collapse edit interface */}
                        <IconButton style={SharedStyles.icon} onPress={() => {
                          setOriginalText('');
                          setEditText('');
                        }} name='undo' type='material' color={props.theme.colors.placeholder} />
                      </Text>
                    </> :
                    <>
                      {/* Button to open section and view content, stretch to fill */}
                      <View style={{ flex: 1, marginRight: props.admin ? -15 : 'auto' }}>
                        <Button {...props} {...localProps} text={item}
                          onPress={() => localProps.navigation.push(item)} />
                      </View>
                      {props.admin &&
                        <Text style={{ marginHorizontal: 10 }}>
                          {/* Open edit interface implemented above */}
                          <IconButton style={SharedStyles.icon} onPress={() => {
                            setOriginalText(item);
                            setEditText(item);
                          }} name='edit' type='material' color={props.theme.colors.placeholder} />
                          {/* Press and hold for 3 seconds to delete entire section */}
                          <IconButton style={SharedStyles.icon}
                            onPress={() => props.snackbar('Press and hold to delete')} delayLongPress={3000}
                            onLongPress={() => deleteInfoSection(props, pages, setPages, data, setData, item)}
                            name='delete' type='material' color={props.theme.colors.danger} />
                        </Text>}
                    </>}
                </View>}
                keyExtractor={item => `${item} ${item === originalText}`}
                onDragEnd={({ data }) => setPages(data)}
                // Reference: https://stackoverflow.com/questions/43397803/how-to-re-render-flatlist
                extraData={{ originalText, editText }} />
                {/* Add new section and update state/data */}
                {props.admin && fetched &&
                  <View style={{ marginBottom: 15 }}>
                    <Button {...props} text='Add Section'
                      onPress={() => addInfoSection(props, pages, setPages,
                        data, setData, setOriginalText, setEditText, newSection)} />
                    </View>}
            </View>} />
          {/* Generated page routes for viewing info sections */}
          {pages.map(page =>
            <Stack.Screen key={page} name={page} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {/* Admin controls */}
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => {
                      setEditText(data.find(entry => entry.title === page).content.join('\n\n'));
                      setImageTop(data.find(entry => entry.title === page).imageTop || null);
                      setImageBottom(data.find(entry => entry.title === page).imageBottom || null);
                      localProps.navigation.push(`Edit ${page}`);
                    }} />}
                {/* Display of content for specific information section */}
                <Content {...props} {...localProps} title={data.find(item => item.title === page).title}
                  imageTop={data.find(item => item.title === page).imageTop}
                  imageBottom={data.find(item => item.title === page).imageBottom} maxImageHeight={300}
                  content={data.find(entry => entry.title === page).content} extraData={fetched} />
              </AppPage>} />)}
          {/* Generated page routes for editing info sections */}
          {props.admin && pages.map(page => `Edit ${page}`).map(page =>
            <Stack.Screen key={page} name={page} children={(localProps) =>
              <AppPage {...props} {...localProps} nested cancel scroll onReturn={() => {
                setEditText('');
                setImageTop(null);
                setImageBottom(null);
              }}>
                <View style={{ flex: 1 }}>
                  {/* Top image with buttons to open image picker or delete image */}
                  <View style={{ marginTop: 15 }}>
                    <Media image={imageTop} scale={{ image: imageTop, maxHeight: 300 }}
                      style={{ alignSelf: 'center', marginBottom: 15 }} />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <MediaPicker {...props} handleResult={setImageTop}
                        text={imageTop ? 'Replace Image' : 'Choose Top Image (Optional)'} />
                    </View>
                    {imageTop &&
                      <View style={{ flex: 1, marginLeft: -15, marginTop: -15 }}>
                        <Button {...props} text='Delete Image' onPress={() => setImageTop(null)} />
                      </View>}
                  </View>
                  {/* All content editable within large text field */}
                  {/* Reference: https://reactnative.dev/docs/textinput */}
                  <BodyInput {...props} value={editText}
                    onChangeText={(value) => setEditText(value)}
                    width={width} onBlur={Keyboard.dismiss} />
                  {/* Bottom image with buttons to open image picker or delete image */}
                  <Media image={imageBottom} scale={{ image: imageBottom, maxHeight: 300 }}
                    style={{ alignSelf: 'center', marginBottom: 15 }} />
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginBottom: 15 }}>
                      <MediaPicker {...props} handleResult={setImageBottom}
                        text={imageBottom ? 'Replace Image' : 'Choose Bottom Image (Optional)'} />
                    </View>
                    {imageBottom &&
                      <View style={{ flex: 1, marginLeft: -15, marginTop: -15 }}>
                        <Button {...props} text='Delete Image' onPress={() => setImageBottom(null)} />
                      </View>}
                  </View>
                  {/* Submit button with logic to update information section content */}
                  <View style={{ marginBottom: 15, marginTop: -15 }}>
                    <Button {...props} color='accent' text='Save'
                      onPress={() => editInfoContent(props, localProps, page, setPages, data, setData,
                        imageTop, imageBottom, editText, setEditText)} />
                  </View>
                </View>
              </AppPage>} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};