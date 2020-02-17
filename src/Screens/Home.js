/* global __DEV__ */


import React, { Component } from 'react';
import { View, Text, Button, Image, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { connect } from "react-redux";
import { fetchTracks } from "../actions/trackActions";
import MusicItem from './Component/MusicItem'


 class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {searchText:""}
    this.searchClick = this.searchClick.bind(this)

    
  }
  unboundMethod () {
    return this.props.tracks.length
  }
  componentDidMount() {
  
  }

  onPlaybackStatusUpdate(){
    
  }

  onChangeText(text){
    this.props.dispatch(fetchTracks(text));
  }

  searchClick(){ 
    this.props.dispatch(fetchTracks(this.props.searchText));
  }
    render() {
    
      const { error, loading, tracks, searchText} = this.props;
      return (
        <SafeAreaView style={styles.container}>
       <View style={{ flexDirection: 'row', height:50, margin: 10}}> 
          <TextInput
          ref = "textInputSearch"
          defaultValue = {this.props.searchText}
          placeholder="Search iTunes"
          style={{ height: 40, marginLeft: 0,  width:'80%', borderColor: 'gray', borderWidth: 0.5,borderRadius:5 , paddingLeft : 10 }}
          onChangeText={text => this.onChangeText(text)}
        />
          <Button title = "Search"
          backgroundColor="#f194ff"
          onPress={()=> this.searchClick()}
        />
         </View>   
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:0,  }}>
          {loading ? <ActivityIndicator size="large" color="#0000ff" /> : tracks.length > 0 ? <FlatList
                    data={tracks}
                    renderItem={({ item }) => <MusicItem key1="music" navigation = {this.props.navigation} item={item} />}
                    keyExtractor={(item,index) => index.toString()}
          />
          :
          <Text style={{textAlignVertical:'center', alignItems:'center', color:'gray', fontSize: 18}}>Type Something into search bar to begin</Text>
          }
       </View>
       </SafeAreaView>
      )
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
  
  
   
  //export default {Home, MusicItem}
  const mapStateToProps = state => ({
    searchText: state.tracks.searchText,
    tracks: state.tracks.items,
    loading: state.tracks.loading,
    error: state.tracks.error
  });



  export default connect(mapStateToProps)(Home);

  