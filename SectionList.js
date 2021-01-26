import { SectionList } from "react-native";

const getData = () =>{
    let contactArr = [];
    let aCode  = "A".charCodeAt(0);
        
    for(let  i = 0 ; i<26 ;i++){
        let currChar  = String.fromCharCode(aCode+i);
        let obj ={
            title:currChar
        }
   

    let currContacts  = contacts.filter(item => {
        return item.name[0].toUpperCase() === currChar;
    });

    if(currContacts.length > 0){
        currContacts.sort((a,b) => a.name.localeCompare(b.name))
        obj.data = currContacts;
        contactArr.push(obj);
    }
}
console.log(contactArr)
return contactArr;
}


return(
    <SectionList 
        sections={getData()}
        ListHeaderComponent={() => {
            return null
        }}
        renderSectionHeader={({section}) =>(
            <View>
                <Text>{section.title}</Text>
            </View>
        )}
    />
)


const getData = () =>{
    console.log("GET DATAA")
  //   let contactArr = [];
  //   let aCode  = "A".charCodeAt(0);
        
  //   for(let  i = 0 ; i<26 ;i++){
  //       let currChar  = String.fromCharCode(aCode+i);
  //       let obj ={
  //           title:currChar
  //       }
   

  //   let currContacts  = contacts.filter(item => {
  //       return item.name[0].toUpperCase() === currChar;
  //   });

  //   if(currContacts.length > 0){
  //       currContacts.sort((a,b) => a.name.localeCompare(b.name))
  //       obj.data = currContacts;
  //       contactArr.push(obj);
  //   }
  // }
  // console.log(contactArr, "Contact arr")
}