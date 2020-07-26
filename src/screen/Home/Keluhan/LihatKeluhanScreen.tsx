import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface LihatKeluhanScreenProps {}

const LihatKeluhanScreen = (props: LihatKeluhanScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>LihatKeluhanScreen</Text>
    </View>
  );
};

export default LihatKeluhanScreen;

const styles = StyleSheet.create({
  container: {},
});
