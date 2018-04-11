import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const emptyTempReducer = (state, action) => { return {} };

const reducers = combineReducers({
	emptyTempReducer
});

export default createStore(reducers, applyMiddleware(thunk));