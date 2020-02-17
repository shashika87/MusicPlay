import APIClient from '../Http/APIClient'

  export function fetchTracks(searchText) {
    return dispatch => {
      dispatch(fetchTracksBegin(searchText));
      // return getTracks(searchText)
      return APIClient("GET","https://itunes.apple.com/search?term="+searchText,null,parser)
        .then(json => {
          dispatch(fetchTracksSuccess(json.results));
          return json.results;
        })
        .catch(error =>
          dispatch(fetchTracksFailure(error))
        );
    };
  }

  function parser(res){

    return res;
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  export const FETCH_TRACKS_BEGIN = "FETCH_TRACKS_BEGIN";
  export const FETCH_TRACKS_SUCCESS =
    "FETCH_TRACKS_SUCCESS";
  export const FETCH_TRACKS_FAILURE =
    "FETCH_TRACKS_FAILURE";

    export const FETCH_TRACK_SELECTED =
    "FETCH_TRACK_SELECTED";
    export const FETCH_TRACK_SELECTED_PREV =
    "FETCH_TRACK_SELECTED_PREV";
    export const FETCH_TRACK_SELECTED_NEXT =
    "FETCH_TRACK_SELECTED_NEXT";
  
  export const fetchTracksBegin = (searchText) => ({
    type: FETCH_TRACKS_BEGIN,
    searchText
  });
  
  export const fetchTracksSuccess = tracks => ({
    type: FETCH_TRACKS_SUCCESS,
    payload: { tracks },
  });
  
  export const fetchTracksFailure = error => ({
    type: FETCH_TRACKS_FAILURE,
    payload: { error }
  });

  export const fetchTrackSelected = track => ({
    type: FETCH_TRACK_SELECTED,
    track
  });

  export const fetchTrackSelectedPrev = track => ({
    type: FETCH_TRACK_SELECTED_PREV,
    track
  });

  export const fetchTrackSelectedNext = track => ({
    type: FETCH_TRACK_SELECTED_NEXT,
    track
  });
  