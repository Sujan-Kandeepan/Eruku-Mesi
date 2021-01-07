import React from 'react';
import { Text } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';

export const Header = (props) =>
  <Text style={{
    color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
    marginHorizontal: 15, marginTop: 15
  }}>{props.text}</Text>;

export const Button = (props) =>
  <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress}
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
  <TouchableOpacity style={props.style} onPress={props.onPress}
    onLongPress={props.onLongPress} delayLongPress={props.delayLongPress}>
    <Icon name={props.name} type={props.type} color={props.color} />
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