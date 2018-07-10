import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
const styleHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8"
  },
  searchInput: {
    flex: 1
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#F8F8F8",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  advertisement: {
    backgroundColor: "#F8F8F8",
    width: Dimensions.get("window").width,
    height: 170,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F8F8F8"
  },
  button: {
    backgroundColor: "red",
    flex: 1
  },
  scrollView: {},
  adContent: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    width: Dimensions.get("window").width,
    height: 170
  },
  indicator: {
    position: "absolute",
    top: 150,
    flexDirection: "row",
    justifyContent: "center"
  },
  selected: {
    width: 8,
    height: 8,
    backgroundColor: "#F8F8F8",
    margin: 2
  },
  circle: {
    width: 9,
    height: 9,
    backgroundColor: "#F8F8F8",
    opacity: 0.4,
    margin: 2
  },
  listContent: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: 145,
    alignItems: "flex-start"
  },
  classOnchoose: {
    backgroundColor: "#74BFBB",
    width: Dimensions.get("window").width * 0.85 * 0.25,
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  classUnChoose: {
    width: Dimensions.get("window").width * 0.85 * 0.25,
    margin: 2,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default styleHome;
