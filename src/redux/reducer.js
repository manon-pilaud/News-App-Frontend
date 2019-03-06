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
    case"UPDATE_USER_COUNTRIES":
    return {
      ...oldState,
      user_countries: [...oldState.user_countries, action.data]
    }
    case "FOLLOW_COUNTRY":
        return {
          ...oldState,
          countries: [...oldState.countries, action.country]
        }
    case "UNFOLLOW_COUNTRY":
      let index = oldState.countries.findIndex(country=>country === action.country)
      let copyOfCountries = [...oldState.countries]
      copyOfCountries.splice(index,1)
      return{
        ...oldState,
        countries: copyOfCountries
      }

      //Im stuck
      case"UPDATE_READING_LIST":
      console.log(oldState,"UPDATE")
      return {
        ...oldState,
        reading_lists: [...oldState.reading_lists, action.joinInfo]
      }
      case "ADD_TO_READING_LIST":
          return {
            ...oldState,
            articles: [...oldState.articles, action.data]
          }
      case "REMOVE_FROM_LIST":
        let indexArticle = oldState.articles.findIndex(article=>article === action.article)
        let copyOfArticles = [...oldState.articles]
        copyOfArticles.splice(indexArticle,1)
        return{
          ...oldState,
          articles: copyOfArticles
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
    default:
      return oldState
  }
}

const userCountryNewsReducer=(oldState={},action)=>{
  switch(action.type){
    case "FETCHED_USER_COUNTRY_NEWS":
    return {...oldState, ...action.articlesHash}
      //Why is it repeating and how do I add to end
    default:
      return oldState
  }
}

const searchTextReducer = (oldState="", action) => {
  switch(action.type){
    case "SEARCHING":
      return action.payload
    case "CLEAR_SEARCH":
      return action.payload
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
  savedArticles: savedArticlesReducer,
  userCountryNews: userCountryNewsReducer,
  filters: searchTextReducer
})

export default rootReducer
