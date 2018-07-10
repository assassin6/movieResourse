import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image,
  Animated
} from "react-native";
import "./storage";
import movieData from "../public/data1.json";
import arrowLeft from "../public/png/arrowLeft.png";
class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1) // 透明度初始值设为0
    };
  }
  componentDidMount() {
    Animated.timing(
      // 随时间变化而执行的动画类型
      this.state.fadeAnim, // 动画中的变量值
      {
        toValue: 0 // 透明度最终变为1，即完全不透明
      }
    ).start(); // 开始执行动画
  }
  render() {
    return (
      <Animated.View // 可动画化的视图组件
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim // 将透明度指定为动画变量值
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
export default class MyCollect extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      movieName: {},
      fadeAnim: new Animated.Value(1)
    };
  }
  componentDidMount() {
    global.storage
      .load({
        key: "collect"
      })
      .then(data => {
        this.setState({
          movieName: data
        });
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          backgroundColor: "#F9F6F6",
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
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
              <Image source={arrowLeft} style={{ height: 40, width: 40 }} />

              <Text style={{ fontSize: 20 }}>返回</Text>
            </View>
          </TouchableHighlight>
          <Button
            title="删除所有"
            onPress={() => {
              this.setState({
                movieName: {}
              });
              Animated.timing(
                // 随时间变化而执行的动画类型
                this.state.fadeAnim, // 动画中的变量值
                {
                  toValue: 0 // 透明度最终变为1，即完全不透明
                }
              ).start();
              global.storage.save({
                key: "collect",
                data: {}
              });
            }}
          />
        </View>
        <ScrollView>
          {movieData.map(obj => {
            if (this.state.movieName[obj.movieName]) {
              return (
                <TouchableHighlight
                  key={obj.movieName}
                  onPress={() => {
                    global.storage
                      .load({
                        key: "collect"
                      })
                      .then(data => {
                        navigate("MovieDetail", {
                          movie: obj,
                          ifCollect: data[obj.movieName]
                        });
                      });
                  }}
                  underlayColor="#D8D8D8"
                >
                  <View style={styles.listContent} ref={obj.movieName}>
                    <Image
                      source={{ uri: obj.postUrl }}
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
                        {obj.movieName}
                      </Text>
                      <Text>导演:{obj.director}</Text>
                      <Text>评分:{obj.score}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listContent: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: 145,
    alignItems: "flex-start"
  }
});
