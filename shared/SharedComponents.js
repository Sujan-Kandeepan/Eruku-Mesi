import React from 'react';
import { Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { FlatList, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';

// Function wrapper to prevent multiple triggers
// Reference: https://stackoverflow.com/a/47229486
const noRepeat = f => f && debounce(f, 500, { leading: true, trailing: false });

export const Header = (props) =>
  <Text style={{
    color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
    marginHorizontal: 15, marginTop: 15
  }}>{props.text}</Text>;

export const Button = (props) =>
  <TouchableOpacity onPress={noRepeat(props.onPress)} onLongPress={noRepeat(props.onLongPress)}
    delayLongPress={props.delayLongPress}>
    <Card containerStyle={{
        backgroundColor: props.accent ? props.theme.colors.accent : props.theme.colors.surface,
        borderColor: props.theme.colors.border
      }} style={{ justifyContent: 'center' }}>
      <Text style={{ alignSelf: 'center', color: props.accent ? 'white' : props.theme.colors.text,
        ...props.textStyle }} children={props.text} />
    </Card>
  </TouchableOpacity>;

export const IconButton = (props) =>
  <TouchableOpacity style={props.style} onPress={noRepeat(props.onPress)}
    onLongPress={noRepeat(props.onLongPress)} delayLongPress={props.delayLongPress}>
    <Icon name={props.name} type={props.type} color={props.color} containerStyle={props.containerStyle} />
  </TouchableOpacity>

export const Toggle = (props) =>
  <Card containerStyle={{ backgroundColor: props.theme.colors.surface, borderColor: props.theme.colors.border }}
    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={{ alignSelf: 'flex-start', color: props.theme.colors.text, fontSize: 16 }}>
      {props.text}
    </Text>
    {/* Reference: https://reactnative.dev/docs/switch */}
    <Switch style={{ alignSelf: 'flex-end', marginTop: -22.5 }}
      thumbColor={props.value ? props.theme.colors.primary : props.theme.colors.text}
      activeThumbColor={props.theme.colors.primary}
      trackColor={{ false: props.theme.colors.disabled, true: props.theme.colors.accent }}
      value={props.value} onValueChange={props.onValueChange} />
  </Card>;

export const Feed = (props) =>
  <FlatList data={props.data} renderItem={({ item }) =>
    <TouchableOpacity onPress={() => props.onItemPress(item)}>
      <Card containerStyle={{
        borderColor: props.theme.colors.border,
        backgroundColor: props.theme.colors.card
      }}>
        {props.cardContent(item)}
      </Card>
    </TouchableOpacity>
  } keyExtractor={props.keyExtractor}
    ListHeaderComponent={!props.fetched ?
      <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
        {props.loadingText}
      </Text> :
      props.data.length === 0 &&
        <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
          Nothing to display at this time.
        </Text>}
    ListFooterComponent={<View style={{ height: 15 }} />} extraData={props.fetched} />

export const Content = (props) =>
  <FlatList data={props.content} renderItem={({ item }) =>
    <Text style={{ color: props.theme.colors.text, margin: 15, marginTop: 0 }}>{item}</Text>
  } keyExtractor={item => item} ListHeaderComponent={
    <Text style={{
      color: props.theme.colors.text,
      fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10,
      textAlign: 'center', textDecorationLine: 'underline'
    }}>
      {props.title}
    </Text>
  } extraData={props.fetched} />