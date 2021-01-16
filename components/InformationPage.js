import React from 'react';
import { Keyboard, Text, View, YellowBox } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import { BodyInput, Button, Content, IconButton } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';
import { get, paragraphs } from '../shared/SharedFunctions';

// Initialize stack navigator
const Stack = createStackNavigator();

// Page for displaying informational content under a modifiable list of sections
export default function InformationPage(props) {
  // State variables for dynamic page information (two-way data binding)
  const [pages, setPages] = React.useState(['General', 'About Us', 'History', 'Contact']);
  const [data, setData] = React.useState(pages.map(page => ({ title: page, content: ['Loading...'] })));
  const [originalText, setOriginalText] = React.useState('');
  const [editText, setEditText] = React.useState('');
  const [fetched, setFetched] = React.useState(false);
  const newSection = 'New Section';
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  // Initial load of data by calling useEffect with [] as second param to run once
  React.useEffect(() => {
    // Wait for all content and trigger update to list by setting flag
    const populate = async () => {
      await Promise.all(pages.map((page, index) =>
        get('https://baconipsum.com/api/?type=meat-and-filler').then(content => {
          let newData = data;
          newData[index] = { title: page, content };
          setData(newData);
        })));
      setFetched(true);
    };
    populate();
  }, []);
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
              {/* Draggable version of FlatList displaying individual sections with options */}
              {/* Reference: https://github.com/computerjazz/react-native-draggable-flatlist */}
              <DraggableFlatList scrollEnabled={false} data={pages} renderItem={({ drag, item }) =>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  {props.admin &&
                    <Text style={{ marginLeft: 5, marginRight: -15 }}>
                      <IconButton style={SharedStyles.icon} onLongPress={drag}
                        onPress={() => props.snackbar('Hold and drag to reorder list', 207)}
                        name='unfold-more' type='material' color={props.theme.colors.placeholder} />
                    </Text>}
                  {/* Inline edit interface for section name */}
                  {props.admin && item === originalText ?
                    <>
                      {/* Text input for new section name */}
                      <TextInput autoFocus autoCapitalize='words' style={{
                        backgroundColor: props.theme.colors.card,
                        color: props.theme.colors.text, flex: 1, height: 50,
                        marginBottom: 1, marginLeft: 15, marginTop: 15, textAlign: 'center'
                      }} value={editText} onChangeText={value => setEditText(value)}
                      onBlur={Keyboard.dismiss} />
                      <Text style={{ marginHorizontal: 10 }}>
                        {/* Save changes and update state/data */}
                        <IconButton style={SharedStyles.icon} onPress={() => {
                          if (pages.includes(editText) && originalText !== editText) {
                            props.snackbar('Duplicate sections not allowed', 224);
                            return;
                          }
                          setPages(pages.map(page => page === originalText ? editText : page));
                          setData(data.map(entry =>
                            entry.title === originalText ? { ...entry, title: editText } : entry));
                          setOriginalText('');
                          setEditText('');
                        }} name='check' type='material' color={props.theme.colors.accent} />
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
                            onPress={() => props.snackbar('Press and hold to delete', 183)}
                            delayLongPress={3000} onLongPress={() => {
                              setPages(pages.filter(page => page !== item));
                              setData(data.filter(entry => entry.title !== item));
                          }} name='delete' type='material' color={props.theme.colors.danger} />
                        </Text>}
                    </>}
                </View>}
                keyExtractor={item => `${item} ${item === originalText}`}
                onDragEnd={({ data }) => setPages(data)}
                // Reference: https://stackoverflow.com/questions/43397803/how-to-re-render-flatlist
                extraData={{ originalText, editText }} />
                {/* Add new section and update state/data */}
                {props.admin &&
                  <View style={{ marginBottom: 15 }}>
                    <Button {...props} text='Add Section'
                      onPress={() => {
                        if (pages.includes(newSection)) {
                          props.snackbar('Rename the previous new section first', 269);
                          return;
                        }
                        setPages([...pages, newSection]);
                        setData([...data, { title: newSection, content: [] }]);
                        setOriginalText(newSection);
                        setEditText(newSection);
                      }} />
                    </View>}
              </ScrollView>} />
          {/* Generated page routes for viewing info sections */}
          {pages.map(page =>
            <Stack.Screen key={page} name={page} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {/* Admin controls */}
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => {
                      setEditText(data.find(entry => entry.title === page).content.join('\n\n'));
                      localProps.navigation.push(`Edit ${page}`);
                    }} />}
                {/* Display of content for specific information section */}
                <Content {...props} {...localProps} title={data.find(item => item.title === page).title}
                  content={data.find(entry => entry.title === page).content} extraData={fetched} />
              </AppPage>} />)}
          {/* Generated page routes for editing info sections */}
          {props.admin && pages.map(page => `Edit ${page}`).map(page =>
            <Stack.Screen key={page} name={page} children={(localProps) =>
              <AppPage {...props} {...localProps} nested cancel onReturn={() => setEditText('')}>
                <View style={{ flex: 1 }}>
                  {/* All content editable within large text field */}
                  {/* Reference: https://reactnative.dev/docs/textinput */}
                  <BodyInput {...props} value={editText}
                    onChangeText={(value) => setEditText(value)}
                    width={width} onBlur={Keyboard.dismiss} />
                  {/* Submit button with logic to update information section */}
                  <View style={{ marginBottom: 15, marginTop: -15 }}>
                    <Button {...props} color='accent' text='Save' onPress={() => {
                        setData(data.map(entry =>
                          page.includes(entry.title)
                            ? { ...entry, content: paragraphs(editText) }
                            : entry));
                        setEditText('');
                        localProps.navigation.pop();
                      }} />
                  </View>
                </View>
              </AppPage>} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};