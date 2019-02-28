import {combineReducers} from 'redux'

const userReducer = (oldState="", action) => {
  switch(action.type){
    case "LOGGED_IN":
      return action.payload
    case "LOGGED_OUT":
      return ""
    default:
      return oldState
  }
}

const articlesReducer=(oldState=[],action)=>{
  switch(action.type){
    case "FETCHED_ARTICLES":
      return action.articles
    default:
      return oldState
  }
}

const localArticlesReducer=(oldState="",action)=>{
  switch(action.type){
    case "FETCHED_LOCAL_ARTICLES":
      return action.localArticles
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
  localArticles: localArticlesReducer,
  countries: countriesReducer,
  currentUser: userReducer
})

export default rootReducer
