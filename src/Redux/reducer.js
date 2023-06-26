import * as types from "./actionTypes";

const inititalState = {
        trendingReposeData: null,
        loading : false,
        error : null
}

const TopReposeReducer = (state = inititalState, action) => {
    switch (action.type) {
        case types.GET_TRENDING_REPOS:
            return {
                ...state,
                loading: true,
            } 
        case types.GET_TRENDING_REPOS_SUCCESS:
           return {
            ...state,
            loading: false,
            trendingReposeData: action.payload
        }
        case types.GET_TRENDING_REPOS_FAIL:
           return{
               ...state,
               loading:false,
               trendingReposeData: null,
               error: action.payload
           }
          default:
           return state;
    }
} 

export default TopReposeReducer;