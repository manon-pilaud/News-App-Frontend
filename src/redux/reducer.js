import {combineReducers} from 'redux'

const savedArticlesReducer=(oldState=[],action)=>{
  switch(action.type){
    case "FETCHED_SAVED_ARTICLES":
      return action.articles
    default:
      return oldState
  }
}
const countryReducer=(oldState="",action)=>{
  switch(action.type){
    case "SET_COUNTRY":
      return action.country
    default:
      return oldState
  }
}

const bbcReducer=(oldState=[],action)=>{
  switch(action.type){
    case "FETCHED_BBC":
      return action.content
    default:
      return oldState
  }
}

const cnnReducer=(oldState=[],action)=>{
  switch(action.type){
    case "FETCHED_CNN":
      return action.content
    default:
      return oldState
  }
}

const userReducer = (oldState="", action) => {
  switch(action.type){
    case "LOGGED_IN":
      return action.payload
    case "LOGGED_OUT":
      return ""
    case "FOLLOW_COUNTRY":
        return {
          ...oldState,
          countries: [...oldState.countries, action.country]
        }
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
      // case "FOLLOW_COUNTRY":
      //  return oldState.map(c => {
      //    if(c.id === action.country.country_id){
      //      return {
      //        ...c,
      //        user_countries: c.user_countries.push(action.country)
      //      }
      //    }
      //    //Why is this not working
      //    return c
      //  })
    default:
      return oldState
  }
}

const rootReducer =combineReducers({
  articles: articlesReducer,
  localArticles: localArticlesReducer,
  countries: countriesReducer,
  currentUser: userReducer,
  cnnNews: cnnReducer,
  bccNews: bbcReducer,
  currentCountry: countryReducer,
  savedArticles: savedArticlesReducer
})

export default rootReducer
