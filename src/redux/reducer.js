import {combineReducers} from 'redux'

const articlesReducer=(oldState=[],action)=>{
  switch(action.type){
    case "FETCHED_ARTICLES":
      return action.articles
    default:
      return oldState
  }
}

const countriesReducer=(oldState=[],action)=>{
  switch(action.type){
    case "FETCHED_COUNTRIES":
      return action.countries
    default:
      return oldState
  }
}

const rootReducer =combineReducers({
  articles: articlesReducer,
  countries: countriesReducer
})

export default rootReducer
