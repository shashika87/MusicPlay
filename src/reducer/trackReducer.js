import {
    FETCH_TRACKS_BEGIN,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE,
    FETCH_TRACK_SELECTED,
    FETCH_TRACK_SELECTED_PREV,
    FETCH_TRACK_SELECTED_NEXT 
  } from "../actions/trackActions";
  
  const initialState = {
    searchText: "",
    items: [],
    loading: false,
    error: null,
    selectedTrack:{},
    prevSelectedTrack:{},
    nextSelectedTrack:{}
  };
  
  export default function trackReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_TRACKS_BEGIN:
        return {
          ...state,
          searchText:action.searchText,
          loading: true,
          error: null,
        };
  
      case FETCH_TRACKS_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.tracks,
          
        };

      case FETCH_TRACKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

      case FETCH_TRACK_SELECTED:
        return {
          ...state,
          selectedTrack: action.track,
        };

      case FETCH_TRACK_SELECTED_PREV:
        return {
          ...state,
          prevSelectedTrack: action.track,
        };

        case FETCH_TRACK_SELECTED_NEXT:
        return {
          ...state,
          nextSelectedTrack: action.track,
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
  