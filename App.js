/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// name=$(href[i]).attr('title');
// urlAddress='https://www.dy2018.com'+$(href[i]).attr('href')
// postUrl='';//海报地址
// releaseTime=''//上映时间
// country=''//国家地区
// releaseCompany=''//发行公司
// writer='';//编剧
// actList=[]//演员列表
// director=''//导演
// class=''//电影类别
// boxOffice=''//电影票房
// plot=''//剧情
// downloadUrl=''//下载地址
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TextInput,
  Image,
  Button,
  Alert,
  ScrollView,
  ListView,
  TouchableHighlight,
  Navigator
} from "react-native";
import {
  createStackNavigator
} from "react-navigation";
import Home from "./view/home";
import MovieDetail from "./view/movieDetail";
import SearchMovie from "./view/searchMovie";
import Mine from './view/mine';
import WebPage from './view/webPage'
import MyCollect from './view/myCollect'
import Login from './view/login'
import Rank from './view/rank'
import Recommend from './view/recommend'
import { YellowBox } from "react-native";
import movieData from "./public/data.json";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
const App = createStackNavigator(
  {
    // 对应界面名称
    Home:{
      screen:Home,
      navigationOptions:{
          header:null
      }
  },
    MovieDetail: {
      screen: MovieDetail
    },
    SearchMovie: {
      screen: SearchMovie
    },
    Mine:{
      screen:Mine
    },
    WebPage:{
      screen:WebPage
    },
    MyCollect:{
      screen:MyCollect
    },
    Login:{
      screen:Login
    },
    Rank:{
      screen:Rank
    },
    Recommend:{
      screen:Recommend
    }
  },
  {
    headerMode: "screen"
  }
);
export default App
