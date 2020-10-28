import React from 'react';
import { Image } from 'react-native';
import { Card } from 'react-native-elements';

/**
 * This is the default construct for a class.
 * Code based off of: https://reactjs.org/docs/react-component.html
 */

export default class Events extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let width = Dimensions.get('window').width;
        // let height = width * 677 / 974;
        return (
            <Card>
                <Image source={require("./assets/2019-Reunion-Flyer.png")}
                    style={{
                        width: "100%", height: "auto",
                        aspectRatio: 974 / 677
                    }} />
            </Card>
        );
    }
}
