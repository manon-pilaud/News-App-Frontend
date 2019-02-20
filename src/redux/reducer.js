import {combineReducers} from 'redux'

const articlesReducer=(oldState="",action)=>{
  switch(action.type){
    case "FETCHED_ARTICLES":
      return action.articles
    default:
      return oldState
  }
}

const countryInfoReducer=(oldState="",action)=>{
  return oldState
}

const rootReducer =combineReducers({
  articles: articlesReducer,
  countries: countryInfoReducer
})

export default rootReducer
