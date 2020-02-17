import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView,TouchableHighlight, Platform } from 'react-native';
import { connect } from "react-redux";
import { fetchTrackSelected, fetchTrackSelectedNext, fetchTrackSelectedPrev } from "../actions/trackActions";
import { nextIndex, prevIndex } from '../Utils/Utils'
import AudioVisualizerView  from './Component/AudioVisualizerView'  
import {Audio} from 'expo-av';
import {NativeModules} from 'react-native';
var RNTAudioView = NativeModules.RNTAudioView;
const soundObject = new Audio.Sound();
class Details extends Component {

  constructor(props) {
    super(props);
    const { track } = this.props.route.params;
    this.state = { isPlaying: false,isLoaded:false }
    if(Platform.OS=='ios'){
      this.trackIndex(track);
    }
  }

  trackIndex(track) {
    this.props.dispatch(fetchTrackSelected(track));
    const selectedIndex = this.props.tracks.findIndex((element) => element.trackId == track.trackId);
    const selectedNextIndex = nextIndex(selectedIndex, this.props.tracks.length)
    const selectedNextTrack = this.props.tracks[selectedNextIndex];
    this.props.dispatch(fetchTrackSelectedNext(selectedNextTrack));
    const selectedPrevIndex = prevIndex(selectedIndex, this.props.tracks.length)
    const selectedPrevTrack = this.props.tracks[selectedPrevIndex];
    this.props.dispatch(fetchTrackSelectedPrev(selectedPrevTrack));
  }

  playTrack(track) {
    this.trackIndex(track);
    if(Platform.OS=='ios'){
    }
    else{
      try {
        soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
        if(this.state.isLoaded){
          soundObject.unloadAsync();
        }
         soundObject.loadAsync({ uri:track.previewUrl,
         headers: {  },
         overrideFileExtensionAndroid: ""
        },
         initialStatus = {shouldPlay: true}, downloadFirst = true
         );
      }
      catch (e) {
               console.log(`cannot play the sound file`, e)
             }
    
    }
  }


  _onPlaybackStatusUpdate = playbackStatus => {
    this.setState({isLoaded:playbackStatus.isLoaded});
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state
  
      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        
        
      } else {
        // Update your UI for the paused state
      }
  
      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }
  
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }
    }
  };
  componentDidMount() {

    if(Platform.OS=='android'){
    const { track } = this.props.route.params;
    this.playTrack(track);
    }
  }

  componentDidUnMount() {

    if(Platform.OS=='android'){
      if(this.state.isLoaded){
        soundObject.unloadAsync();
      }
    }
  }

  render() {
    const { selectedTrack, prevSelectedTrack, nextSelectedTrack, tracks } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={{ flex: 1, }}>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 50, }}>
            <AudioVisualizerView 
            style ={{ width: 130, 
              height: 130, 
              borderRadius: 130 / 2,
              backgroundColor:"gray",}}
            urlPreview={selectedTrack.previewUrl}>
            </AudioVisualizerView>
          
            <View style={{width:10,height:30}}></View>
            <Image
              style={{ width: 180, height: 180, borderRadius: 180 / 2 }}
              source={{ uri: selectedTrack.artworkUrl100 }} />
              
            <Text style={{ width: 190, alignItems: 'center', fontSize: 20, textAlign: 'center', marginTop: 20, flexWrap: 'wrap' }}>{selectedTrack.trackName}</Text>
            <Text style={{ width: 190, alignItems: 'center', fontSize: 17, textAlign: 'center', marginTop: 5, flexWrap: 'wrap' }}>{selectedTrack.artistName}</Text>
            <Text style={{ width: 190, alignItems: 'center', fontSize: 17, textAlign: 'center', marginTop: 5, flexWrap: 'wrap' }}>{selectedTrack.collectionCensoredName}</Text>
            <Text style={{ alignItems: 'center', fontSize: 17, textAlign: 'center', marginTop: 15, flexWrap: 'wrap' }}>{"Collection Price: $" + selectedTrack.collectionPrice + " " + selectedTrack.currency}</Text>
            {selectedTrack.trackPrice?<Text style={{ alignItems: 'center', fontSize: 17, textAlign: 'center', marginTop: 5, flexWrap: 'wrap' }}>{"Track Price: $" + selectedTrack.trackPrice + " " + selectedTrack.currency}</Text> : null}
            {!selectedTrack.previewUrl?
            <Text style={{ width: 190, alignItems: 'center', fontSize: 20, textAlign: 'center', marginTop: 20, flexWrap: 'wrap' }}>{"No preview music avaialable"}</Text>
            : null}
            
            <View style={{ flexDirection: 'column'}}>
          <View style={styles.fixToText}>
              <TouchableOpacity
                style={styles.button}
               
                onPress={() => {
                  this.playTrack(prevSelectedTrack)
                }}
              >
                <View style={styles.TriangleShapeCSSPrevSide} />
              </TouchableOpacity>
              <PlayPause />
              <TouchableOpacity
                style={styles.button}
                
                onPress={() => {
                  this.playTrack(prevSelectedTrack)
                }}
              >
                <View style={styles.TriangleShapeCSS} />
              </TouchableOpacity>
            </View>
            <Text style={{margin:20, fontSize:23}} >Buy Music from following</Text>
            <View style={{alignItems:'center'}}>
            <View style={{ flex: 1, flexDirection: 'row',}} >
            <TouchableOpacity
                style={styles.button}
                onPress={() => {}}
              >
                <Image source={require("../assets/Amazon.png")}
                style={{width: 40,height:40}}
                   />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {}}
              >
                <Image source={require("../assets/iTunes.png")}
                style={{width: 40,height:40, marginLeft :20}}
                 />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {}}
              >
                <Image source={require("../assets/GooglePlay.png")}
                style={{width: 40,height:40, marginLeft :20}}
                 />
              </TouchableOpacity>
              </View>
              </View>
            </View> 
          </View>
          
          
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


class PlayPause extends Component {

  constructor(props) {
    super(props);
    this.state = { play: true }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Platform.OS=='ios' ? (this.state.play ? RNTAudioView.stop() : RNTAudioView.start()):
          (this.state.play ? soundObject.stopAsync() : soundObject.playAsync())
          this.setState({ play: !this.state.play })
        }}
      >
        <View style = {{marginLeft:50,
    marginRight:50,}}>
        <View style={(this.state.play ? styles.SquareShapeCSS : styles.TriangleShapeCSS)} />
        </View>
      </TouchableOpacity>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    marginTop: 20,
    paddingRight:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  TriangleShapeCSS: {

    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    transform: [{ rotate: "90deg" }],
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black'
  },

  TriangleShapeCSSPrevSide: {

    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    transform: [{ rotate: "-90deg" }],
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black'
  },

  SquareShapeCSS: {

    width: 20,
    height: 20,
    transform: [{ rotate: "90deg" }],
    borderStyle: 'solid',
    backgroundColor: 'black',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#00BCD4'
  }
});



const mapStateToProps = state => ({
  tracks: state.tracks.items,
  selectedTrack: state.tracks.selectedTrack,
  prevSelectedTrack: state.tracks.prevSelectedTrack,
  nextSelectedTrack: state.tracks.nextSelectedTrack,
});


export default connect(mapStateToProps)(Details);