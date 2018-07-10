/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
let movieClass = [
  "动作",
  "冒险",
  "奇幻",
  "爱情",
  "科幻",
  "剧情",
  "喜剧",
  "战争",
  "运动",
  "恐怖",
  "惊悚",
  "犯罪",
  "悬疑",
  "传记",
  "所有类型"
];
import React, { Component } from "react";
import {
  Platform,
  styleSheet,
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
  DrawerLayoutAndroid,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import styleHome from "./styleHome";
import "./storage";
import WebPage from "./webPage";
import movieData from "../public/data1.json";
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      currentPage: 0,
      dataSource: ds.cloneWithRows(movieData),
      touchMovie: "",
      contentScroll: false, //列表是否滚动默认fasle未滚动
      collectList: [],
      randomMovie: Math.round(Math.random() * 10 + 1),
      movieClass: "所有类型",
      headOpacity:1
    };
    this._renderRow = this._renderRow.bind(this);
  }
  filterMovie(option) {
    if (option === "所有类型") {
      option = "";
    }
    const movieDataNew = movieData.filter(
      obj => obj.class.toString().indexOf(option) != -1
    );
    if (option === "") {
      option = "所有类型";
    }
    this.setState({
      dataSource: ds.cloneWithRows(movieDataNew),
      movieClass: option
    });
  }
  _renderRow(rowData, sectionId, rowId) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight
        onPress={() => {
          global.storage
            .load({
              key: "collect"
            })
            .then(data => {
              navigate("MovieDetail", {
                movie: rowData,
                ifCollect: data[rowData.movieName]
              });
            });
        }}
        underlayColor="#D8D8D8"
      >
        <View style={styleHome.listContent} ref={rowData.movieName}>
          <Image
            source={{ uri: rowData.postUrl }}
            style={{ height: 135, width: 96, margin: 5 }}
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 5,
              flex: 1
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {rowData.movieName}
            </Text>
            <Text>导演:{rowData.director}</Text>
            <Text>评分:{rowData.score}</Text>
            <Text>{rowData.class.toString()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  componentDidMount() {
    this.startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  startTimer() {
    this.interval = setInterval(() => {
      nextPage = this.state.currentPage + 1;
      if (this.state.currentPage === 3) {
        this.setState({
          currentPage: 0
        });
      } else
        this.setState({
          currentPage: nextPage
        });
      const offSetX = this.state.currentPage * Dimensions.get("window").width;
      this.refs.scrollView.scrollResponderScrollTo({
        x: offSetX,
        y: 0,
        animated: true
      });
    }, 4500);
  }
  componentWillMount() {
    clearInterval(this.interval);
  }
  render() {
    const scrollTop = (
      <TouchableHighlight
        onPress={() => {
          this.setState({
            contentScroll: false
          });
          this.refs.pageScroll.scrollResponderScrollTo({
            x: 0,
            y: 0,
            animated: true
          });
        }}
        underlayColor="#74BFBB"
      >
        <View
          style={{
            backgroundColor: "#74BFBB",
            height: 30,
            width: Dimensions.get("window").width,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>返回顶部</Text>
        </View>
      </TouchableHighlight>
    );
    const { navigate } = this.props.navigation;

    const menu = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#F9F6F6",
          flex: 1
        }}
      >
        <Image
          style={{
            width: Dimensions.get("window").width * 0.85,
            height: Dimensions.get("window").height * 0.25
          }}
          source={{
            uri:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527085265785&di=40a5034e0303bd6c78ea1aafc8c1e45d&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fc9fcc3cec3fdfc03777b0d1ad83f8794a4c22615.jpg"
          }}
        />
        <View style={{ position: "absolute", top: 30 }}>
          <TouchableNativeFeedback
            onPress={() => {
              navigate("Login");
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 40 }}
                source={{
                  uri:
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527069241594&di=7015273b17f57ad25c19e599b5858e5b&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fwh%253D680%252C800%2Fsign%3D1177054670cb0a468577833f5353da1c%2Ff636afc379310a55ae9d3948bc4543a9832610d4.jpg"
                }}
              />

              <View>
                <Text style={{ color: "whitesmoke", fontSize: 20 }}>
                  点击登录
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            width: Dimensions.get("window").width * 0.85,
            padding: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              alignItems: "center"
            }}
          >
            <Image
              source={require("./png/favorite.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text
              onPress={() => {
                navigate("MyCollect");
              }}
              style={{ color: "black", fontSize: 15, marginLeft: 10 }}
            >
              我的收藏
            </Text>
          </View>
          <View
            style={{
              marginBottom: 20,
              flexDirection: "column"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("./png/class.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text
                onPress={() => {
                  navigate("MyCollect");
                }}
                style={{ color: "black", fontSize: 15, marginLeft: 10 }}
              >
                电影分类
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {movieClass.map(obj => (
                <TouchableNativeFeedback
                  key={obj}
                  onPress={() => {
                    this.filterMovie(obj);
                  }}
                >
                  <View
                    style={
                      this.state.movieClass === obj
                        ? styleHome.classOnchoose
                        : styleHome.classUnChoose
                    }
                  >
                    <Text>{obj}</Text>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={"drawerLayout"}
        drawerWidth={Dimensions.get("window").width * 0.85}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => menu}
      >
        <View style={styleHome.container}>
          <View style={{marginLeft: 10,
            marginRight: 10,
            backgroundColor: "#F8F8F8",
            height: 40,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",opacity:this.state.headOpacity}}>
            <TouchableHighlight
              onPress={() => {
                this.refs.drawerLayout.openDrawer();
              }}
              underlayColor="#D8D8D8"
            >
              <Image
                source={require("../public/png/Category.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableHighlight>
            <Text style={{ fontSize: 18 }}>电影资源站</Text>
            <TouchableHighlight
              onPress={() => {
                navigate("SearchMovie");
              }}
              underlayColor="#D8D8D8"
            >
              <Image
                source={require("../public/png/search.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableHighlight>
          </View>
          <View style={styleHome.advertisement}>
            <ScrollView
              ref="scrollView"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
            >
              <TouchableNativeFeedback
                onPress={() => {
                  navigate("WebPage", {
                    urlAdderss:
                      "https://h5.m.taopiaopiao.com/app/dianying/pages/alfheim/content.html?spm=a1z2r.7661912.home.6.3fa5112acOzlkx&id=50813&s=dy&s=tb&cityCode=360100"
                  });
                }}
              >
                <View style={styleHome.adContent}>
                  <Image
                    source={{
                      uri:
                        "http://gw.alicdn.com/tfs/TB1H9Y1tamWBuNjy1XaXXXCbXXa-1280-520.jpg_720x720Q30s100.jpg_.webp"
                    }}
                    style={{
                      width: Dimensions.get("window").width,
                      height: 250
                    }}
                  />
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  navigate("WebPage", {
                    urlAdderss:
                      "https://h5.m.taopiaopiao.com/app/dianying/pages/alfheim/content.html?spm=a1z2r.7661912.home.4.3fa5112acOzlkx&id=50857&s=tb&cityCode=360100"
                  });
                }}
              >
                <View style={styleHome.adContent}>
                  <Image
                    source={{
                      uri:
                        "http://gw.alicdn.com/tfs/TB1Vg8WteSSBuNjy0FlXXbBpVXa-1280-520.jpg_720x720Q30s100.jpg_.webp"
                    }}
                    style={{
                      width: Dimensions.get("window").width,
                      height: 200
                    }}
                  />
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  navigate("WebPage", {
                    urlAdderss:
                      "https://h5.m.taopiaopiao.com/app/dianying/pages/alfheim/content.html?spm=a1z2r.7661912.home.5.3fa5112a3QJbGF&id=50788&s=tb&cityCode=360100"
                  });
                }}
              >
                <View style={styleHome.adContent}>
                  <Image
                    source={{
                      uri:
                        "http://gw.alicdn.com/tfs/TB1KsZhs7yWBuNjy0FpXXassXXa-1280-520.jpg_720x720Q30s100.jpg_.webp"
                    }}
                    style={{
                      width: Dimensions.get("window").width,
                      height: 200
                    }}
                  />
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  navigate("WebPage", {
                    urlAdderss:
                      "https://market.m.taopiaopiao.com/markets/TaoBaoMovie/zhaishunvol32?spm=a1z2r.7661912.home.3.3fa5112aBYa8LM&s=tb&cityCode=360100"
                  });
                }}
              >
                <View style={styleHome.adContent}>
                  <Image
                    source={{
                      uri:
                        "https://market.m.taopiaopiao.com/markets/TaoBaoMovie/zhaishunvol32?s=tb&spm=dianying.tb.1.1&cityCode=360100"
                    }}
                    style={{
                      width: Dimensions.get("window").width,
                      height: 200
                    }}
                  />
                </View>
              </TouchableNativeFeedback>
            </ScrollView>
            <View style={styleHome.indicator}>
              <View
                style={
                  this.state.currentPage === 0
                    ? styleHome.selected
                    : styleHome.circle
                }
              />
              <View
                style={
                  this.state.currentPage === 1
                    ? styleHome.selected
                    : styleHome.circle
                }
              />
              <View
                style={
                  this.state.currentPage === 2
                    ? styleHome.selected
                    : styleHome.circle
                }
              />
              <View
                style={
                  this.state.currentPage === 3
                    ? styleHome.selected
                    : styleHome.circle
                }
              />
            </View>
          </View>
          <View style={styleHome.content}>
            <View style={{ width: Dimensions.get("window").width, height: 70 ,justifyContent:'space-around',flexDirection:'row'}}>
              <TouchableNativeFeedback onPress={()=>{
                  navigate("Rank");
                }}>
                <View style={{ flexDirection: "column" }} >
                  <Image
                    source={require("./png/rank.png")}
                    style={{ width: 40, height: 40, marginTop: 8 }}
                  />
                  <Text style={{fontSize:10}}>排行榜</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={()=>{
                this.refs.drawerLayout.openDrawer();
              }}>
                <View style={{ flexDirection: "column" }}>
                  <Image
                    source={require("./png/class.png")}
                    style={{ width: 40, height: 40, marginTop: 8 }}
                  />
                  <Text style={{fontSize:10}}>电影分类</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={()=>{
                navigate("Recommend");
              }}>
                <View style={{ flexDirection: "column" }}>
                  <Image
                    source={require("./png/推荐.png")}
                    style={{ width: 40, height: 40, marginTop: 8 }}
                  />
                  <Text style={{fontSize:10}}>好片推荐</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              showsHorizontalScrollIndicator={false}
              onEndReached={this._endReached}
              ref="pageScroll"
              // onScroll={()=>{
              //   this.setState({
              //     headOpacity:this.state.headOpacity-0.5
              //   })
              // }}
              onMomentumScrollEnd={e => {
                if (e.nativeEvent.contentOffset.y < 300) {
                  this.setState({
                    contentScroll: false
                  });
                } else {
                  this.setState({
                    contentScroll: true
                  });
                }
              }}
            />
            {this.state.contentScroll ? scrollTop : <View />}
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}
