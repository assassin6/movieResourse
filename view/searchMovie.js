import React, { Component } from 'react';
import {
    TextInput,
    Button,
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import './storage'
import movieData from '../public/data.json';

export default class SearchMovie extends Component {
  constructor(props){
    super(props);
    this.state={
      search:'s'
    }
  }
  static navigationOptions = {
    header:null
  };
  render() {
    const { navigate,state } = this.props.navigation;
    const hotMovie=[]
    for(let i=0;i<10;i++){
     hotMovie[i]=movieData[i]
    }
    return (
      <View>
      <View style={{flexWrap: "nowrap",alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
      <TouchableHighlight onPress={()=>{
          this.props.navigation.goBack()
        }}
        underlayColor="#D8D8D8">
      <Image source={ require('../public/png/arrowLeft.png')} style={{height:40,width:40}} />
      </TouchableHighlight>
        <TextInput placeholder="搜索电影" autoFocus={true} onChangeText={(value)=>{
          if(value){
            this.setState({
          search:value
        })
          } else {
            this.setState({
              search:'none'
          })
        }
      }}
      style={{flex:1}}></TextInput>
      
      </View>
      
      <ScrollView
      ref="scrollView"
      showsHorizontalScrollIndicator={false}>
      <View>
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
        <Text style={{margin:3,fontSize:20,fontWeight:'bold'}}>热门搜索:</Text>
        {hotMovie.map((obj)=>{
          return (
            <TouchableHighlight onPress={()=>{
              global.storage.load({
                key:'collect'
              }).then(data=>{
                navigate("MovieDetail", { movie: obj,ifCollect:data[obj.movieName]});
              })
            }
            }
            key={obj.movieName}
            underlayColor='#D8D8D8'>
            <Text  style={{margin:3,borderWidth:1,padding:3,borderRadius:5,borderColor:'#707070',backgroundColor:'#F9F6F6'}}>{obj.movieName}</Text>
            </TouchableHighlight>
          )
        })}
      </View>
      
      <View> 
      {movieData.filter((objs)=>(
        objs.movieName.search(this.state.search)!==-1
      )).map((obj)=>{
        return (
          <TouchableHighlight key={obj.movieName} onPress={()=>{
            global.storage.load({
              key:'collect'
            }).then(data=>{
              navigate("MovieDetail", { movie: obj,ifCollect:data[obj.movieName]});
            })
        }}
        underlayColor='#D8D8D8'>
        <View style={styles.listContent} ref={obj.movieName}  >
        <Image source={{uri:obj.postUrl}} style={{height:135,width:96,margin:5}}/>
        <View style={{flexDirection:'column',alignItems:'flex-start',marginLeft:5,flex:1}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>{obj.movieName}</Text>
        <Text>导演:{obj.director}</Text>
        <Text>评分:{obj.score}</Text>
        </View>
        </View>
        </TouchableHighlight>
        )
      })}
      </View>
      </ScrollView>
      <View style={{position:'absolute',top:42,width:Dimensions.get('window').width-47,left:44,backgroundColor:'#F9F6F6',paddingLeft:5}}>
      {movieData.filter((objs)=>(
        objs.movieName.search(this.state.search)!==-1
      )).map((obj)=>{
        return (
          <Text style={{fontSize:17,marginTop:4}} key={obj.movieName} onPress={()=>{
            this.setState({
              search:obj.movieName
            })
          }}>{obj.movieName}</Text>
        )
      })}
      </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  listContent:{
    flexDirection:'row',
    width:Dimensions.get('window').width,
    height:145,
    alignItems:'flex-start'
}
})
