// import * as React from 'react';
// import { StatusBar, FlatList, Image, ImageBackground, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
// const { width, height } = Dimensions.get('screen');
// import RenderItem from './src/component/RenderItem'
// import faker from 'faker'

// faker.seed(10);
// let i = 0;
// const DATA = [...Array(500).keys()].map((_, i) => {
//   i= i+1;
//     return {
//         key: faker.random.uuid(),
//         image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
//         name: faker.name.findName(),
//         jobTitle: faker.name.jobTitle(),
//         email: i,
        
//     };
// });

// const  BG_IMG ='https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg';
// const SPACING = 20;
// const AVATAR_SIZE = 70;
// const ITEM_SIZE = AVATAR_SIZE + SPACING+3;

// export default () => {


//   const scrollY = React.useRef(new Animated.Value(0)).current;
//     return (
//       <ImageBackground 
//         source={{uri:BG_IMG}}
//         style={{...StyleSheet.absoluteFillObject}}
//         blurRadius={10}
//       >    
//       <StatusBar hidden />
//         <Animated.FlatList 
//           data={DATA}
//           onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {y: scrollY}}}],
//             {useNativeDriver:true},          
//           )}
//           contentContainerStyle={{
//             padding:SPACING,
//             paddingTop:StatusBar.height,
//           }}
//           legacyImplementation={false}
//           horizontal={false}
//           windowSize={150}
//           removeClippedSubviews={true}
//           initialNumToRender={55}
//           updateCellsBatchingPeriod={5}
//           numColumns={1}
//           onEndReachedThreshold={.4}
//          // refreshing={true}
//           maxToRenderPerBatch={100}
//           keyExtractor={item => item.key}
//           renderItem={({item, index}) => (
//             <RenderItem  item={item} index={index} />
//              )} 
//         />
//       </ImageBackground>
//     )
// }

import * as React from 'react';
import { StatusBar,View, Text, Dimensions,findNodeHandle, Animated,StyleSheet, Image,  TouchableOpacity,} from 'react-native';

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
    ref:React.createRef() 
  }));
  
  const Tab = React.forwardRef(({item , onItemPress}, ref) =>{
    return(
      <TouchableOpacity onPress={onItemPress}>
        <View ref={ref} style={{ backgroundColor:"black", borderRadius:5, paddingHorizontal:5, paddingVertical:5 }}>
          <Text 
            style={{
              color:'#fff',
              fontSize:84/data.length,  
              fontWeight:'800' 
            }}>{item.title}
        </Text>
        </View>
      </TouchableOpacity>
    )
  }) 

  const Indicator = ({measures, scrollX}) =>{
    
    const inputRange = data.map((_,i) => i*width);   
    const indicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange:measures.map(measure => measure.width)
    })
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange:measures.map(measure => measure.x)
    })

    return(
       <Animated.View 
        style = {{
          position:'absolute', 
          height:4,
          width:indicatorWidth,
          left:0,
          backgroundColor:"#fff",
          bottom:-10,
          transform:[{
            translateX
          }]
        }} 
      /> 
    )
  }

   const Tabs = ({data, scrollX, onItemPress}) =>{
     const [measures, setMeasures] = React.useState([]);
      const containerRef = React.useRef();
      React.useEffect(() =>{
        let m = [];
        data.forEach(item =>{
          item.ref.current.measureLayout(
            containerRef.current,
            (x, y, width, height) =>{
            m.push({
              x, y, width, height 
            })
            if(m.length === data.length){
              setMeasures(m);
            }
          }) 
        })
      },[measures])
   
      return (
        <View style={{position:'absolute', top:40 , width }}>
          <View 
           ref={containerRef}
           style={{justifyContent:"space-evenly", flex:1, flexDirection:'row',}}>
            {data.map((item, index)  => {
              return <Tab key ={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
            })}
          </View>
         {measures.length > 0 && <Indicator  measures={measures} scrollX={scrollX} />}
        </View>
      )
  }
   
  export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset:itemIndex * width
    })
   
  })
 
  return (
    <View style={styles.container}>
      <StatusBar hidden />
       <Animated.FlatList 
       ref={ref}
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled 
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {useNativeDriver:false}
        )}
        bounces={false}
        renderItem= {({item}) =>{
          return(
            <View style={{width, height}}>
              <Image 
                source={{uri:item.image}}
                style={{flex:1, resizeMode:"cover"}}
              />
              <View  style={[StyleSheet.absoluteFillObject,{backgroundColor:"rgba(0,0,0,.3)"}]} />
            </View>
          )
        }}
    />
    <Tabs 
      scrollX={scrollX}
      data={data}
      onItemPress={onItemPress}
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
