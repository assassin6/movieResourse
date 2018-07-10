import React, { Component } from 'react'
import arrowLeft from "../public/png/arrowLeft.png";
import { View ,Text ,StyleSheet ,TextInput ,Button,Dimensions ,TouchableHighlight,Image} from 'react-native'
export default class Login extends Component {
    static navigationOptions={
        header:null
    }
  render() {
    return (
        <View style={{flex:1}}>
        <View
          style={{
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "space-between",
            height: 50,
            flexDirection: "row"
          }}
        >
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.goBack();
            }}
            underlayColor="#F9F6F6"
          >
            <View style={{ flexDirection: "row" }}>
              <Image source={arrowLeft} style={styles.imageShape} />

              <Text style={{ fontSize: 20 }}>登录</Text>
            </View>
          </TouchableHighlight>
        </View>
      <View style={styles.container}>
      <Image style={{width:100,height:100,borderRadius:50,marginTop:50}} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527069241594&di=7015273b17f57ad25c19e599b5858e5b&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fwh%253D680%252C800%2Fsign%3D1177054670cb0a468577833f5353da1c%2Ff636afc379310a55ae9d3948bc4543a9832610d4.jpg'}}/>
        <TextInput placeholder='账号:' style={styles.textInput} ref='account' onChangeText={(value)=>{

        }}></TextInput>
        <TextInput placeholder='密码:' style={styles.textInput} ref='password' secureTextEntry={true}></TextInput>
        <View style={styles.includeButton}>
        <TouchableHighlight>
           <View style={styles.signButton}><Text>注册</Text></View></TouchableHighlight>
           <TouchableHighlight><View style={styles.logButton}><Text >登录</Text></View></TouchableHighlight>
        </View>
        <Text style={{color:'#449EFE',margin:10}}>游客登录</Text>
      </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems: "center"
    },
    textInput:{
        borderBottomColor:'green',
        width:Dimensions.get('window').width*0.8,
        marginTop:10
    },
    includeButton:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:Dimensions.get('window').width*0.8,
        marginTop:35
    },
    signButton:{
      width:110,
      height:45,
      borderWidth:1.5,
      borderColor:'#74BFBB',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    },
    logButton:{
      width:110,
      height:45,
      borderWidth:1,
      borderColor:'#74BFBB',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:'#74BFBB'
    },
    imageShape:{
      width:40,
      height:40
    }
})
