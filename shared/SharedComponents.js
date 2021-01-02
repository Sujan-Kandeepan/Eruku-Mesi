import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';

export const Header = (props) =>
  <Text style={{
    color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
    marginHorizontal: 15, marginTop: 15
  }}>{props.text}</Text>;

export const Button = (props) =>
  <TouchableOpacity onPress={props.onPress}>
    <Card containerStyle={{ backgroundColor: props.theme.colors.surface, borderColor: props.theme.colors.border }}
      style={{ justifyContent: 'center' }}>
      <Text style={{ ...props.textStyle, alignSelf: 'center' }}>{props.text}</Text>
    </Card>
  </TouchableOpacity>;

export const Toggle = (props) =>
  <Card containerStyle={{ backgroundColor: props.theme.colors.surface, borderColor: props.theme.colors.border }}
    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={{ alignSelf: 'flex-start', color: props.theme.colors.text, fontSize: 16 }}>
      {props.text}
    </Text>
    {/* Reference: https://reactnative.dev/docs/switch */}
    <Switch style={{ alignSelf: 'flex-end', marginTop: -22.5 }}
      thumbColor={props.value ? props.theme.colors.primary : props.theme.colors.text}
      trackColor={{ false: props.theme.colors.disabled, true: props.theme.colors.accent }}
      value={props.value} onValueChange={props.onValueChange} />
  </Card>;