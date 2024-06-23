import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  toastr: toastrReducer, 
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
