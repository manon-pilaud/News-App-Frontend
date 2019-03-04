const NewsKey = process.env.REACT_APP_NEWS_API_KEY;

// Testing
// const NewsKey = "snfdajkndjscdjbcbhjbv"

function setCountry(country){
  return{type:"SET_COUNTRY", country}
}

function currentUser(){
    return (dispatch) => {
        fetch("http://localhost:3000/api/v1/profile", {
                method: "GET",
                headers: {
                    "Authentication": `Bearer ${localStorage.token}`
                }
            })
            .then(res => res.json())
            .then(userInfo => {
                dispatch(loggedIn(userInfo))
            })
    }
}

function loggingInUser(userInfo){

    return (dispatch) => {
        fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
	        headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"},
	        body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data => {
              if(data.error){
                alert('Incorrect username or password')
              } else {
                dispatch(loggedIn(data.userInfo))
                localStorage.setItem("token", data.token)
              }
          })
        }
}

function loggedIn(userInfo){
    return {type: "LOGGED_IN", payload: userInfo}
}

function loggingOut(){
    return {type: "LOGGED_OUT"}
}

function fetchedArticles(articles){
  return {type:"FETCHED_ARTICLES", articles}
}

function fetchedLocalArticles(localArticles){
  return {type:"FETCHED_LOCAL_ARTICLES", localArticles}
}

function fetchingLocalArticles(country){
  return(dispatch)=>{
    if (country.code){
    fetch(`https://newsapi.org/v2/top-headlines?country=${country.code}&apiKey=${NewsKey}`)
    .then(res=>res.json())
    .then(localArticles=> {
      dispatch(fetchedLocalArticles(localArticles))
    })
    }
    else if(country.name === "Jordan"){
      fetch(`https://newsapi.org/v2/everything?q=Hashemite-Kingdom-of-Jordan&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(localArticles=> {
        dispatch(fetchedLocalArticles(localArticles))
      })
    }
    else{
      fetch(`https://newsapi.org/v2/top-headlines?q=${country.name}&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(localArticles=> {
        dispatch(fetchedLocalArticles(localArticles))
      })
    }
  }
}


function fetchingArticles(country){
  return(dispatch)=>{
    if(country.name === "Jordan"){
      fetch(`https://newsapi.org/v2/everything?q=Hashemite-Kingdom-of-Jordan&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(articles=> {
        dispatch(fetchedArticles(articles))
      })
    }
    else{
      fetch(`https://newsapi.org/v2/everything?q=${country.name}&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(articles=> {
        dispatch(fetchedArticles(articles))
      })
    }
  }
}

function fetchedCountries(countries){
  return {type:"FETCHED_COUNTRIES", countries}
}


function fetchingCountries(){
  return(dispatch)=>{
    fetch(`http://localhost:3000/api/v1/countries`)
    .then(res=>res.json())
    .then(countries=> {
      dispatch(fetchedCountries(countries))
    })
  }
}

let Parser = require('rss-parser');

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

function fetchingBBC(){
  return(dispatch)=>{
    let parser = new Parser();

    const bbcPromise = (async () => {
      let feed = await parser.parseURL(CORS_PROXY + "http://feeds.bbci.co.uk/news/world/rss.xml" );
      let bbcArray = []
      feed.items.forEach(item => {
        bbcArray.push(item)
      });
      return bbcArray
    })();
    bbcPromise.then(info=> {
      dispatch(fetchedBBC(info))
    })
  }
}

function fetchedBBC(content){
  return {type:"FETCHED_BBC", content}
}

function fetchingCNN(){
  return(dispatch)=>{
    let parserTwo = new Parser();

    const cnnPromise = (async () => {
      let feed = await parserTwo.parseURL(CORS_PROXY + "http://rss.cnn.com/rss/edition_world.rss");
      let cnnArray = []
      feed.items.forEach(item => {
        cnnArray.push(item)
      });
      return cnnArray
    })();
    cnnPromise.then(info=> {
      dispatch(fetchedCNN(info))
    })
  }
}

function fetchedCNN(content){
  return {type:"FETCHED_CNN", content}
}

function fetchingSavedArticles(){
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/articles`)
    .then(res=>res.json())
    .then(articles=> {
      dispatch(fetchedSavedArticles(articles))
    })
  }
}

function fetchedSavedArticles(articles){
  return {type:"FETCHED_SAVED_ARTICLES",articles}
}

function fetchingUserNews(country){
  //Need a functiton that for each getState.countries dispatches this function
  return(dispatch)=>{
    if(country.name === "Jordan"){
      fetch(`https://newsapi.org/v2/everything?q=Hashemite-Kingdom-of-Jordan&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(articles=> {
        dispatch(fetchedArticles(articles,country))
      })
    }
    else{
      fetch(`https://newsapi.org/v2/everything?q=${country.name}&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(articles=> {
        let articlesHash ={}
        articlesHash[country.name]= articles.articles
        dispatch(fetchedUserNews(articlesHash))
      })
    }
  }
}

function fetchedUserNews(articlesHash){
  return {type:"FETCHED_USER_COUNTRY_NEWS",articlesHash}
}

function creatingUser(userInfo){
  return (dispatch) =>{
    fetch("http://localhost:3000/api/v1/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: userInfo.username,
                    password: userInfo.password

                }
            })
        }).then(res=>res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }else {
                setUser(data,dispatch)
            }
      })
  }
}

function setUser(data,dispatch){
    if (data.success && data.token) {
       localStorage.setItem('token', data.token)
        dispatch({
            type: "LOGGED_IN",
            payload: data.userInfo
        })
    }else{
        alert('something went wrong')
    }
}




export{setUser,fetchedUserNews,fetchingUserNews,fetchedSavedArticles,fetchingSavedArticles,setCountry,fetchingBBC,fetchedBBC,fetchingCNN,fetchedCNN,currentUser,loggingInUser,loggedIn,loggingOut,fetchingArticles,fetchedArticles,fetchingCountries,fetchedCountries,fetchedLocalArticles,fetchingLocalArticles,creatingUser}
