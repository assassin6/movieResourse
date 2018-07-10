import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  View,
    Image,
    Button,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    ToastAndroid,
    Clipboard
   } from 'react-native'
import PropTypes from 'prop-types';
import './storage'
import arrowLeft from './png/arrowLeft.png'
export default class MovieDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      collected:false
    }
  }
  static navigationOptions = {
    header:null
  };
  
  render() {
    const { navigate,state } = this.props.navigation;
    return (
      <View style={{backgroundColor:'#F9F6F6',paddingLeft:10,paddingRight:10}}>
      <View style={{flexWrap: "nowrap",alignItems:'center',justifyContent:'space-between',height:50,flexDirection:'row'}}>
      <TouchableHighlight onPress={()=>{
          this.props.navigation.goBack()
        }}
        underlayColor="#F9F6F6">
        <View style={{flexDirection:'row'}}>
      <Image source={arrowLeft} style={styles.imageShape} />
      
      <Text style={{fontSize:20}}>返回</Text></View>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>{
        const toastMessage=state.params.ifCollect||this.state.collected?'取消收藏':'已收藏'
        ToastAndroid.show(toastMessage, ToastAndroid.SHORT)
        global.storage.load({
          key:'collect'
        }).then(data=>{
          if(data[state.params.movie.movieName]){
            delete data[state.params.movie.movieName]
            state.params.ifCollect=false
            this.setState({
            collected:false
          })
          }
          else{
            data[state.params.movie.movieName]=state.params.movie.movieName;
          global.storage.save({
            key: 'collect',  // 注意:请不要在key中使用_下划线符号!
            data:data,
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
          });
          this.setState({collected:!this.state.collected});
          }
        })
        
      }}
      underlayColor="#F9F6F6"
      >
       {state.params.ifCollect||this.state.collected?<View style={{flexDirection:'row',alignItems:'center'}}><Image source={require('./png/startChoose.png')} style={styles.imageShape}/><Text>已收藏</Text></View>:<View style={{flexDirection:'row',alignItems:'center'}}><Image source={require('./png/start.png')} style={styles.imageShape} /><Text>添加收藏</Text></View>}
      </TouchableHighlight>
      </View>
      <ScrollView
      ref="scrollView"
      showsHorizontalScrollIndicator={false} 
     >
     <View style={styles.content}>
          <Image source={{uri:state.params.movie.postUrl}} style={styles.post}/>
          <View ><Text>片 名:{state.params.movie.movieName}</Text>
          <Text>评 分:{state.params.movie.score}</Text>
          <Text>年 代:{state.params.movie.releaseTime}</Text>
          <Text>产 地:{state.params.movie.country}</Text>
          <View><Text>类 别:{state.params.movie.class.map((str,i)=>(<Text key={i}>{str}/</Text>))}</Text></View>
          <Text>导 演:{state.params.movie.director}</Text>
          <View><Text>主 演:{state.params.movie.actList.map((str,i)=>(<Text key={i}>{str}/</Text>))}</Text></View>
          <Text style={{letterSpacing:2,color:'red'}}>剧 情:</Text>
          <Text>{state.params.movie.plot}</Text>
          <View style={{marginTop:15,flexWrap:'wrap'}}><Text>下载地址:</Text>
          {state.params.movie.downloadUrl.map((str,i)=>(<Text key={i} style={styles.downloadUrls} selectable={true} onPress={()=>{
            Clipboard.setString(str)
            ToastAndroid.show('已复制到剪切板', ToastAndroid.SHORT)
          }}>{str}</Text>))}
          </View>
          </View>
      </View>
      </ScrollView></View>
       
    );
  }
}
const styles=StyleSheet.create({
  content:{
    flex:1,
    flexDirection:'column',
    padding:10,
    width:Dimensions.get('window').width,
    overflow:'scroll',
    marginBottom:50
  },
  post:{
    height:270,
    width:192
  },
  downloadUrls:{
    height:70,
    backgroundColor:'#FFE79C'
  },
  imageShape:{
    width:40,
    height:40
  }
})



