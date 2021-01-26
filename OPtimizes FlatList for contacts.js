import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SafeAreaView,Dimensions, TextInput, FlatList,ActivityIndicator, Animated, StyleSheet, View, Text, PermissionsAndroid, StatusBar, NativeModules, TouchableOpacity} from 'react-native';
const { MyCustomWindowManager } = NativeModules;
import CallDetectorManager from 'react-native-call-detection'
import Contacts from 'react-native-contacts';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Ionicons'
const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const App = () => {
  const [contacts,setContacts] = useState([])
  const [searchdata,setSearchData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search_text, setSearch_text] = useState("")
  
  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    ]).then((result) =>{
      console.log(result)
    }).catch((err) => {
      console.log(err)
    })
  },[]);

  
  useEffect(() =>{
    Contacts.getAll().then(contacts1 => {
      let items = []
      contacts1.forEach((item,index) =>{
        items.push({
          key:index,
          name:item.displayName,
          phoneNumbers:[...new Set(item.phoneNumbers.map(x => x.number.replace(/-|\s/g,"")))]
        })
      })
      setContacts(items)
      setSearchData(items)
      setLoading(false);
    })
  },[])
  
  const renderMessage = () => {
    return (
        <View style={{flex:1, marginTop:'200%', justifyContent:"center", alignItems:"center"}}>
            <Icon name="md-alert-circle-outline" color="red" size={50} />
            <Text style={{color:'white',fontSize:20}}>
                No Contact
            </Text>
        </View>
    );
};

const RenderItem = ({item}) => {
  if(item.phoneNumbers.length !== 0){
  return useMemo(() => {
  
    return (
      item.phoneNumbers.map(phone => (
        <TouchableOpacity key={phone}  style={styles.single_contact_style}>
          <EvilIcon name='user' size={40} color='#fff' style={{alignSelf:"center"}}/> 
          <View style={styles.name_number_view}>
            <Text style={[styles.text, {fontWeight:"bold"}]}>{item.name}</Text>
            <Text style={styles.text}>{phone}</Text>
          </View>        
      </TouchableOpacity>
     ))
    )
  }, []);
 }else{ return null}
}

  const searchFilterFunction = (text) => {
    console.log(text, 'Text')
    setSearch_text(text);  
      const newData = contacts.filter(item => {      
        const itemData = `${item.name.toUpperCase()} ${item.phoneNumbers.map(phone => phone.toUpperCase())}`
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;    
      });
    setSearchData(newData)
  };

  return (
    <View style={styles.container}> 
      <StatusBar barStyle="dark-content" backgroundColor="#99c0ff"  /> 
      <SafeAreaView>
        {!loading?
        <View style={styles.search_view} >
            <FontAwesome name='search' size={20} color='#fff' style={{}} />
            <TextInput 
              style={{
                backgroundColor:"rgba(135, 135, 135, .1)", 
                height:35,
                borderRadius:10,
                paddingHorizontal:10,
                fontSize:12, 
                color:"#fff",
                minWidth:Dimensions.get("screen").width - 90 
              }}
              placeholder="Search contact here"
              placeholderTextColor="#fff"
              value={search_text}
              onChangeText={(text) => searchFilterFunction(text)}
            />
            <Entypo name="cross" size={20} color={search_text.length === 0 ?'#adadad':'#fff'}
              onPress={() => searchFilterFunction("")}
            />
        </View>
        :null}
        {!loading 
        ? 
          <FlatList
            data={searchdata.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())}
            style={{marginTop:40}}
            renderItem={({item}) => (
            <RenderItem  item={item} />
             )} 
            legacyImplementation={true}
            horizontal={false}
            windowSize={150}
            removeClippedSubviews={true}
            initialNumToRender={26}
            updateCellsBatchingPeriod={30}
            numColumns={1}
            onEndReachedThreshold={0.7}
            refreshing={true}
            maxToRenderPerBatch={20}
            keyExtractor={(item) =>{
              return item.key.toString()
            }}

            ListEmptyComponent={renderMessage}                                       
          />
        :
        <ActivityIndicator size="large" color="red" />
        }
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    backgroundColor:"#8ab7ff",
    justifyContent:"center",
  },
  search_view:{
    flexDirection:"row",
    position:"absolute",
    top:2,
    zIndex:2,
    backgroundColor:"#adadad",
    minWidth:Dimensions.get('screen').width-10,
    borderRadius:10,
    paddingHorizontal:5,
    marginHorizontal:5,
    paddingVertical:2, 
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  button_style:{
    backgroundColor:"red",
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:15, 
  },
  text:{
    fontSize:12,
    color:'white',
  },
  single_contact_style:{
    backgroundColor: '#6b6b6b', 
    borderRadius:10,
    maxHeight:50,
    paddingHorizontal:10,
    marginVertical:4,
    minWidth:Dimensions.get('screen').width-10,
    marginHorizontal:5,
    flexDirection: 'row',
  },
  name_number_view:{
    justifyContent:'space-around',
    paddingVertical:5, 
    paddingHorizontal:10, 
    flexDirection: 'column'
  }
});

export default App;
