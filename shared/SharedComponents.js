import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Image, Platform, Text, TextInput, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { FlatList, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';

import { filenameOrDefault, scale } from './SharedFunctions';

// Function wrapper to prevent multiple triggers
// Reference: https://stackoverflow.com/a/47229486
const noRepeat = f => f && debounce(f, 500, { leading: true, trailing: false });

// Header component for page subdivision
export const Header = (props) =>
  <Text style={{
    color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
    marginBottom: props.label ? -7.5 : 0, marginHorizontal: 15, marginTop: 15
  }}>{props.text}</Text>;

// Button component with card style
export const Button = (props) =>
  <TouchableOpacity disabled={props.disabled} onPress={noRepeat(props.onPress)}
    onLongPress={noRepeat(props.onLongPress)} delayLongPress={props.delayLongPress}>
    <Card containerStyle={{
        backgroundColor: props.color ? props.theme.colors[props.color] : props.theme.colors.surface,
        borderColor: props.theme.colors.border
      }} style={{ justifyContent: 'center' }}>
      <Text style={{ alignSelf: 'center', color: props.color ? 'white' : props.theme.colors.text,
        ...props.textStyle }} children={props.text} />
    </Card>
  </TouchableOpacity>;

// Button appearing as small icon
export const IconButton = (props) =>
  <TouchableOpacity style={props.style} disabled={props.disabled} onPress={noRepeat(props.onPress)}
    onLongPress={noRepeat(props.onLongPress)} delayLongPress={props.delayLongPress}
    activeOpacity={props.noFeedback ? 1.0 : 0.2}>
    <Icon name={props.name} type={props.type} color={props.color} containerStyle={props.containerStyle} />
  </TouchableOpacity>;

// Card component containing switch with accompanying label text
export const Toggle = (props) =>
  <Card containerStyle={{ backgroundColor: props.theme.colors.surface, borderColor: props.theme.colors.border }}
    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    {/* Text pushed to left and aligned with switch */}
    <Text style={{ alignSelf: 'flex-start', color: props.theme.colors.text, fontSize: 16 }}>
      {props.text}
    </Text>
    {/* Switch pushed to right and aligned with text */}
    {/* Reference: https://reactnative.dev/docs/switch */}
    <Switch style={{ alignSelf: 'flex-end', marginTop: -22.5 }}
      thumbColor={props.value ? props.theme.colors.primary : props.theme.colors.text}
      activeThumbColor={props.theme.colors.primary}
      trackColor={{ false: props.theme.colors.disabled, true: props.theme.colors.accent }}
      value={props.value} onValueChange={props.onValueChange} />
  </Card>;

// Switch with accompanying label text and no background
export const ToggleWithoutCard = (props) =>
  <View style={props.style}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* Text pushed to left and aligned with switch */}
      <Text style={{ alignSelf: 'flex-start', color: props.theme.colors.text, fontSize: 16 }}>
        {props.text}
      </Text>
      {/* Switch pushed to right and aligned with text */}
      {/* Reference: https://reactnative.dev/docs/switch */}
      <Switch style={{ alignSelf: 'flex-end' }}
        thumbColor={props.value ? props.theme.colors.primary : props.theme.colors.text}
        activeThumbColor={props.theme.colors.primary}
        trackColor={{ false: props.theme.colors.disabled, true: props.theme.colors.accent }}
        value={props.value} onValueChange={props.onValueChange} />
    </View>
  </View>;

// Image or video component with given image source and properties
export const Media = (props) =>
  <>
    {props.image && props.image.uri && props.image.uri.match(/(jpg|jpeg|png|gif)$/g) &&
      <Image source={{ uri: props.image.uri }}
        style={{ ...scale(props.scale), ...props.style }} />}
    {props.image && props.image.uri && props.image.uri.endsWith('mp4') &&
      (props.thumbnail
        ? <Text style={{ color: props.theme.colors.text, marginTop: 7.5 }}>
            {filenameOrDefault(props.image)}
          </Text>
        : <Video source={{ uri: props.image.uri }} shouldPlay useNativeControls isLooping
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            style={{ ...scale(props.scale), ...props.style }} />)}
  </>;

// Image/video picker component exposing system file explorer
export const MediaPicker = (props) =>
  <View style={{ marginTop: -15 }}>
    <Button {...props} text={props.text} onPress={async () => {
      try {
        // Reference: https://docs.expo.io/versions/latest/sdk/imagepicker/
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions[props.allowVideo ? 'All' : 'Image'],
          allowsEditing: true,
          quality: 1,
        });
        if (!result.cancelled) {
          props.handleResult(result);
        }
      } catch (error) {
        console.log(error);
        props.snackbar(`File selected is not a valid photo${props.allowVideo ? ' or video' : ''}`)
      }
    }} />
  </View>;

// Document picker component exposing system file explorer
export const FilePicker = (props) =>
  <View style={{ marginTop: -15 }}>
    <Button {...props} text={props.text} onPress={async () => {
      try {
        // Reference: https://docs.expo.io/versions/latest/sdk/document-picker/
        let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
        if (!result.cancelled) {
          props.handleResult(result);
        }
      } catch (error) {
        console.log(error);
        props.snackbar('Currently only .pdf files allowed')
      }
    }} />
  </View>;

// Button triggering file download
export const FileDownload = (props) =>
  <View style={{ marginTop: -15 }}>
    <Button {...props} text={props.text} onPress={async () => {
      try {
        // Reference: https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/
        if (Platform.OS === 'web') return props.snackbar('File download not supported on web');
        props.snackbar(`${props.destination} downloading`);
        let result = await FileSystem.downloadAsync(props.source,
          `${FileSystem.documentDirectory}/${props.destination}`);
        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status != 'granted') return;
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) await MediaLibrary.createAlbumAsync('Download', asset, false);
        else await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        props.snackbar(`${props.destination} downloaded`)
      } catch (error) {
        console.error(error);
        props.snackbar('Download failed')
      }
    }} />
  </View>;

// List component accepting common item layout and rendering options
export const Feed = (props) =>
  <FlatList data={props.data} renderItem={({ item }) =>
    // Clickable card containing specified content for each item
    <TouchableOpacity onPress={() => props.onItemPress(item)}>
      <Card containerStyle={{
        borderColor: props.theme.colors.border,
        backgroundColor: props.theme.colors.card
      }}>
        {props.cardContent(item)}
      </Card>
    </TouchableOpacity>
  } keyExtractor={props.keyExtractor}
    // Display text if content loading or empty
    ListHeaderComponent={
      <>
        {props.header}
        {!props.fetched ?
        <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
          {props.loadingText}
        </Text> :
        props.data.length === 0 &&
          <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
            Nothing to display at this time.
          </Text>}
      </>}
    ListFooterComponent={
      <>
        {props.footer}
        <View style={{ height: 15 }} />
      </>} extraData={props.fetched} />;

// Component to display expanded content for individual item
export const Content = (props) =>
  <FlatList data={props.content} removeClippedSubviews={false} renderItem={({ item }) =>
    // Supports only text paragraphs currently, can add more functionality later
    <Text selectable style={{ color: props.theme.colors.text, margin: 15, marginTop: 0 }}>{item}</Text>
  } keyExtractor={item => item} ListHeaderComponent={
    <>
      {/* Display title above rest of content */}
      {props.title && <Text selectable style={{
        color: props.theme.colors.text, fontSize: 24, fontWeight: 'bold',
        marginTop: 20, marginBottom: 10, textAlign: 'center'
      }}>
        {props.title}
      </Text>}
      {/* Display top image if exists */}
      {props.imageTop &&
        <Media image={props.imageTop} scale={{ image: props.imageTop, maxHeight: props.maxImageHeight }}
          style={{ alignSelf: 'center', marginBottom: 15 }} />}
      {/* Display subtitle below title, line by line */}
      {props.subtitle && props.subtitle.split('\n').map((line, index) =>
      <Text selectable key={index} style={{
        color: props.theme.colors.text,
        fontSize: 16, marginBottom: 10,
        textAlign: 'center'
      }}>
        {line}
      </Text>)}
    </>
  } ListFooterComponent={
    <>
      {/* Display extra content if exists */}
      {props.extraContent}
      {/* Display bottom image if exists */}
      {props.imageBottom &&
        <Media image={props.imageBottom} scale={{ image: props.imageBottom, maxHeight: props.maxImageHeight }}
          style={{ alignSelf: 'center', marginBottom: 15 }} />}
    </>
  } extraData={props.fetched} />;

// Component to input title field in form
 //Reference: https://reactnative.dev/docs/textinput
export const TitleInput = (props) =>
  <TextInput placeholder={props.placeholder} placeholderTextColor={props.theme.colors.placeholder}
    autoFocus={props.autoFocus} autoCapitalize='words' editable spellCheck
    onFocus={props.onFocus} onBlur={props.onBlur} style={{
      backgroundColor: props.theme.colors.card,
      borderColor: props.theme.colors.border, borderWidth: 1,
      color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
      margin: 15, marginBottom: 0, paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center'
    }} value={props.value} onChangeText={props.onChangeText} />;

// Component to input simple field in form
export const SimpleInput = (props) =>
  <TextInput placeholder={props.placeholder} placeholderTextColor={props.theme.colors.placeholder}
    autoFocus={props.autoFocus} autoCapitalize={props.autoCapitalize} editable spellCheck
    secureTextEntry={props.password} autoCompleteType={props.autoCompleteType}
    keyboardType={props.keyboardType} onFocus={props.onFocus} onBlur={props.onBlur} style={{
      backgroundColor: props.theme.colors.card,
      borderColor: props.theme.colors.border, borderWidth: 1, color: props.theme.colors.text,
      margin: 15, marginBottom: 0, paddingHorizontal: 10, paddingVertical: 5,
      textAlign: props.left ? 'left' : 'center'
    }} value={props.value} onChangeText={value => {
      if (props.maxLength && value.length > props.maxLength)
        props.snackbar && props.snackbar(props.maxLengthMessage || 'Input is too long');
      else
        props.onChangeText && props.onChangeText(value);
    }} />;

// Component to input body field in form
export const BodyInput = (props) =>
  <TextInput placeholder={props.placeholder} placeholderTextColor={props.theme.colors.placeholder}
    autoFocus={props.autoFocus} multiline editable spellCheck
    onFocus={props.onFocus} onBlur={props.onBlur} style={{
      backgroundColor: props.theme.colors.card,
      borderColor: props.theme.colors.border, borderWidth: 1,
      color: props.theme.colors.text, flex: 1, margin: 15,
      padding: 20, textAlignVertical: 'top', width: props.width
    }} value={props.value} onChangeText={props.onChangeText} />;