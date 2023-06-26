import {combineReducers} from 'redux'
import TopReposeReducer from './reducer'


const rootReducer = combineReducers({
   data: TopReposeReducer, 
})

export default rootReducer 