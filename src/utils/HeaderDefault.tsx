import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface HeaderDefaultProps {
  title: string;
}

const HeaderDefault = (props: HeaderDefaultProps) => {
  const {title} = props;
  const navigation = useNavigation();
  return (
    <View
      style={{height: 52, backgroundColor: '#00AA13', flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 14,
        }}>
        <Icon name="chevron-back-outline" size={28} color="white" />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 14,
        }}>
        <View style={{width: 28}}></View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderDefault;

const styles = StyleSheet.create({
  container: {},
});
