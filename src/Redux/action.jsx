import { verifyData } from "../Pages/Components/verifyData";
import * as types from "./actionTypes";
import axios from "axios";

const fetchTrendingRepose = () =>({
    type: types.GET_TRENDING_REPOS
})

const  fetchTrendingReposeSuccess = (cocktails) =>({
    type: types.GET_TRENDING_REPOS_SUCCESS,
    payload: cocktails
})

const  fetchTrendingReposeFail = (error) =>({
    type: types.GET_TRENDING_REPOS_FAIL,
    payload: error
})

export const themeHandler = (value)=>({
    type: types.TOGGLE_THEME_COLOR,
    payload: value
}
)


export function fetchTrendingReposHandler(json){
    return function(dispatch) {
        dispatch(fetchTrendingRepose());
        // setTimeout(()=>{
        let token = JSON.parse(localStorage.getItem("session"))?.access_token
        const header = `Authorization: Bearer${token}`;
        axios.get(`https://api.github.com/search/repositories?q=${verifyData(json?.DateRange) ? `created:>=${json?.DateRange}+` : ''}stars:>1${verifyData(json?.Language) ? `+language:${json?.Language}` : ''}${verifyData(json?.SpokenLanguage) ? `+spoken_language_code:${json?.SpokenLanguage}` : ''}&sort=stars${verifyData(json?.SortOrder) ? `&order=${json?.SortOrder}` : ''}&per_page=10`).then((response)=>{ 
        
        const apiRes = response?.data?.items
            dispatch(fetchTrendingReposeSuccess(apiRes))
        })
        .catch((error)=> {
            dispatch(fetchTrendingReposeFail(error));
        })
    // },[1000])
    }
}
