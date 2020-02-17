import React, { Component } from 'react';
import { View, Text, Button, Image, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator  } from 'react-native';

export default class MusicItem extends Component {
    render(){

      return (
        <TouchableOpacity
         style={styles.button}
         onPress={() => {
           /* 1. Navigate to the Details route with params */
           this.props.navigation.navigate('Details',{
            track:  this.props.item
           })
         }}
       >
        <View  style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Image 
        style={{width: 70, height: 70,}}
         source={{uri: this.props.item.artworkUrl100}} />
         <View  style={{paddingLeft: 10,}}>
            <Text style={{flex: 1, fontSize:18, height:50,width:300, flexWrap: 'wrap'}}>{this.props.item.trackName}</Text>
            <Text style={{flex: 1, fontSize:14, color:'gray', height:40,width:140, flexWrap: 'wrap', }}>{"by " + this.props.item.artistName}</Text>
        </View>
      </View>
      </TouchableOpacity>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
      backgroundColor: 'white'
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  