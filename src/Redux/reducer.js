import * as types from "./actionTypes";

const inititalState = {
        trendingReposeData: null,
        loading : false,
        error : null,
        currentTheme: JSON.parse(localStorage.getItem('themeData')), 
}

const TopReposeReducer = (state = inititalState, action) => {
    switch (action.type) {
        case types.GET_TRENDING_REPOS:
            return {
                ...state,
                loading: true,
                trendingReposeData:null,
                error: null,
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
        case types.TOGGLE_THEME_COLOR:
            return{
                currentTheme: JSON.parse(localStorage.getItem('themeData'))
            }

          default:
           return state;
    }
} 

export default TopReposeReducer;