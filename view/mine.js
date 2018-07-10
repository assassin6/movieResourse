import React, { Component } from 'react'
import { 
 View,Text
   } from 'react-native'
import PropTypes from 'prop-types'
export default class Mine extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{width:200}}><Text>Hello</Text></View>
        )
    }
}