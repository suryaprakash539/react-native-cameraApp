import React, {useState} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Text style={{fontSize: 30, color: 'red'}}>Loading....</Text>
  </View>
);

const App = () => {
  const [image, setImage] = useState(null);

  const takePicture = async (camera) => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      console.log(data);
      setImage(data.uri);
    } catch (error) {
      console.warn(error);
    }
  };

  return <></>;
};

export default App;
