import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, Platform } from 'react-native';

class AudioVisualizerView extends Component {
    render() {
      const resView = Platform.OS == "ios" ? <RNTAudioView {...this.props} />: null
      return resView;
    }
  }

  AudioVisualizerView.propTypes = {
    urlPreview: PropTypes.string,
  };

// requireNativeComponent automatically resolves 'RNTMap' to 'RNTMapManager'
if(Platform.OS == "ios"){
  module.exports = requireNativeComponent('RNTAudioView');
}
else{
  module.exports = AudioVisualizerView
}


// RNTAudioView.js
