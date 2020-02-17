import React from 'react'
import Details from '../Screens/Details'
import { shallow } from 'enzyme'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from "../reducer/rootReducer";
import thunk from "redux-thunk";
import {fetchTracksBegin, fetchTracksSuccess, fetchTracksFailure, } from '../actions/trackActions'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import items from './MockData/SearchResult'
import { TouchableOpacity,Image,View,TextInput } from 'react-native';
import {
  FETCH_TRACKS_BEGIN,
  FETCH_TRACKS_SUCCESS,
  FETCH_TRACKS_FAILURE,
  FETCH_TRACK_SELECTED,
  FETCH_TRACK_SELECTED_PREV,
  FETCH_TRACK_SELECTED_NEXT 
} from "../actions/trackActions";


const mockStore = configureStore([thunk]);

let store
describe('Details', () => {
  let instance
  var component;
  beforeEach(() => {
    // Simulate fetching a user from an API and loading it into state.
    var tracks={}
    store = mockStore({
      tracks:{
      searchText: "",
      items: [],
      loading: false,
      error: null,
      selectedTrack:items[1],
      prevSelectedTrack:items[0],
      nextSelectedTrack:items[2]
    }
  });
   
    //store.dispatch = jest.fn();
    component = renderer.create(
    <Provider store={store}>
      <Details />
    </Provider>
  );
})

  it('should render Details', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  // it('FETCH_TRACKS_BEGIN (action equal)', () => {
  //   const searchAction = fetchTracksBegin("john");
  //   store.dispatch(searchAction);
    
  //   expect(store.getActions()).toEqual([searchAction]);
  // });

  // it('FETCH_TRACKS_SUCCESS (action equal)', () => {
  //   const resultAction = fetchTracksSuccess(items)
  //   store.dispatch(resultAction);
  //   expect(store.getActions()).toEqual([resultAction]);
  // });

  // it('FETCH_TRACKS_BEGIN (snapshot equal)', () => {
  //   const searchAction = fetchTracksBegin("john");
  //   store.dispatch(searchAction);
  //   expect(store.getActions()).toMatchSnapshot()
  // });

  // it('FETCH_TRACKS_SUCCESS (snapshot equal)', () => {
  //   const resultAction = fetchTracksSuccess(items)
  //   store.dispatch(resultAction);
  //   expect(store.getActions()).toMatchSnapshot()
  // });

  // let componentMusic = renderer.create(
  //     items.map(function(element, index){
  //       return <MusicItem key={"key"+index} item={element}  />
  //     })
  //   )
  //   it('should render state with data from Redux store', () => {
  //     expect(componentMusic.toJSON()).toMatchSnapshot();
  //   });

  //   test('MusicItem component counts='+items.length, () => {
  //     //console.log(componentMusic.root.children.length);
  //     expect(componentMusic.root.children.length).toEqual(items.length)
  //   })

})



