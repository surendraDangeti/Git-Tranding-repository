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

// const fetchSingleCocktailStart = () =>({
//     type: types.GET_SINGLE_COCKTAIL_START
// })

// const fetchSingleCockTailSuccess = (cocktail) =>({
//     type: types.GET_SINGLE_COCKTAIL_SUCCESS,
//     payload: cocktail
// })

// const fetchSingleCookTailFailure = (error) =>({
//     type: types.GET_SINGLE_COCKTAIL_FAIL,
//     payload: error
// })

export function fetchTrendingReposHandler(){
    return function(dispatch) {
        dispatch(fetchTrendingRepose());
        axios.get(`https://api.github.com/search/repositories?sort=stars&order=desc&q=java&Default=5`).then((response)=>{
            // const cocktails = 
            const apiRes = response?.data?.items
            dispatch(fetchTrendingReposeSuccess(apiRes))
        })
        .catch((error)=> {
            dispatch(fetchTrendingReposeFail(error));
        })
    }
}

// export function fetchSingleCocktail(id){
//     return function(dispatch) {
//         dispatch(fetchSingleCocktailStart());
//         axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response)=>{
//             console.log("response");    
//             const cocktail = response.data.drinks;
//             dispatch(fetchSingleCockTailSuccess(cocktail))
//         })
//         .catch((error)=> {
//             dispatch(fetchSingleCookTailFailure(error));
//         })
//     }
// }