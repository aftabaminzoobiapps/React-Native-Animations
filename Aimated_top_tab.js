import * as React from 'react';
import { StatusBar,View, Text, Dimensions, TextInput,DeviceEventEmitter,
        FlatList, Animated,StyleSheet, InteractionManager, Image
} from 'react-native';

const {width, height} = Dimensions.get('screen')

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
}));

export default function App() {
  const ScrolX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
       <Animated.FlatList 
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event([{nativeEvent:{contentOffset:{x:ScrolX}}}],
          {useNativeDriver:false}
          )}
        keyExtractor={item => item.key}
        bounces={false}
        renderItem= {({item}) =>{
          return(
            <View style={{width, height}}>
              <Image 
                source={{uri:item.image}}
                style={{flex:1, resizeMode:"cover"}}
              />
            </View>
          )
        }}

/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});