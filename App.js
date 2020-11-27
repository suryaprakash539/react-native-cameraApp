import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

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
      // console.log(data);
      setImage(data.uri);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <View style={styles.preview}>
            <Text style={styles.camText}>Here is your profile picture</Text>
            <Image
              style={styles.clicked}
              source={{uri: image, width: '100%', height: '80%'}}
            />
            <Button
              style={{marginTop: 50}}
              title="Click another picture"
              onPress={() => {
                setImage(null);
              }}></Button>
          </View>
        ) : (
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'To click a picture',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio',
              message: 'To record audio',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}>
            {({camera, status}) => {
              if (status !== 'READY') return <PendingView />;
              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => takePicture(camera)}>
                    <Text>Snap</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        )}
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0A79DF',
  },

  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  capture: {
    flex: 0,
    backgroundColor: 'orange',
    padding: 10,
    alignSelf: 'center',
  },

  camText: {
    width: '100%',
    backgroundColor: '#3498DB',
    paddingVertical: 20,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'white',
  },

  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
