import React, { Component } from "react";
import {
  WebView,View,Dimensions
} from "react-native";
export default class WebPage extends Component{
    static navigationOptions = {
        title:'返回'
      };
    render(){
        const { state } = this.props.navigation;
        
        return (
            
            <WebView source={{uri:state.params.urlAdderss}}
                style={{width:Dimensions.get("window").width,height:200}}
            ></WebView>
        
        )
    }
}