import React from 'react';
import { Text } from 'react-native';

/**
 * This is the default construct for a class.
 * Code based off of: https://reactjs.org/docs/react-component.html
 */

export default class Events extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text>Events page</Text>
        );
    }
}
