import React, { Component } from "react";
import { View, Text,TouchableNativeFeedback,StyleSheet,Dimensions,Image} from "react-native";
import movieData from "../public/data1.json";
import "./storage";
export default class Rank extends Component {
  static navigationOptions = {
    title:'返回'
  };
  render() {
    const { navigate,state } = this.props.navigation;
    let data=[];
    const hotMovie=[]
    for(let i=10;i<20;i++){
     hotMovie[i]=movieData[i]
    }
    return (
      <View>
      <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
      <Text style={{margin:3,fontSize:20,fontWeight:'bold'}}>好片推荐:</Text>
      {hotMovie.map((obj,index)=>{
        
          return (
          <TouchableNativeFeedback key={obj.movieName} onPress={()=>{
            global.storage.load({
              key:'collect'
            }).then(data=>{
              navigate("MovieDetail", { movie: obj,ifCollect:data[obj.movieName]});
            })
        }}
        underlayColor='#D8D8D8'>
        <View style={styles.listContent} ref={obj.movieName}  >
        <Text style={{height:30,width:30,margin:5}}>{index-9}.</Text>
        <View style={{flexDirection:'column',alignItems:'flex-start',marginLeft:5,flex:1}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>{obj.movieName}</Text>
        </View>
        </View>
        </TouchableNativeFeedback>
        )
        
      })}
    </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  listContent:{
    flexDirection:'row',
    width:Dimensions.get('window').width,
    height:40,
    alignItems:'flex-start'
}
})