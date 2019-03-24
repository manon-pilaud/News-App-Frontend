const NewsKey = process.env.REACT_APP_NEWS_API_KEY;
const GuardianKey = process.env.REACT_APP_GUARDIAN_API_KEY;
const NytKEY= process.env.REACT_APP_NYT_API_KEY
// Testing
// const NewsKey = "snfdajkndjscdjbcbhjbv"
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${country.name}&fq=news_desk:("Foreign")&begin_date=20190101&api-key=${APIKEY}
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

function fetchingGuardianArticles(country){
  return(dispatch)=>{
    if( country.name ==="Sierra Leone"|| country.name ==="Solomon Islands" || country.name==="Saudi Arabia"
    || country.name==="New Zealand" || country.name ==="South Africa"|| country.name ==="Sri Lanka"
    || country.name ==="Dominican Republic"){
      fetch(`http://content.guardianapis.com/world/${country.name.toLowerCase().split(" ").join("")}?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))

    }else if(country.name==="United States"){
      fetch(`http://content.guardianapis.com/us-news?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else if(country.name==="United Kingdom"){
      fetch(`http://content.guardianapis.com/uk-news?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else if(country.name==="Republic of Congo"){
      fetch(`http://content.guardianapis.com/world/congo-brazzaville?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else if(country.name==="Democratic Republic of the Congo"){
      fetch(`http://content.guardianapis.com/world/congo?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else if(country.name==="State of Palestine"){
      fetch(`http://content.guardianapis.com/world/palestinian-territories?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else if(country.name==="East Timor"){
      fetch(`http://content.guardianapis.com/world/timor-leste?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else if(country.name==="Saint Lucia"){
      fetch(`http://content.guardianapis.com/world/stlucia?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else if(country.name==="Federated States of Micronesia"){
      fetch(`http://content.guardianapis.com/world/micronesia?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
    }
    else{
      fetch(`http://content.guardianapis.com/world/${country.name.toLowerCase().split(" ").join("-")}?api-key=${GuardianKey}`,{
            mode: "cors",
            method: "GET",
            headers: {
            "Accept": "application/json"
          }
        })
      .then(response => response.json())
      .then(data=>dispatch(fetchedGuardianArticles(data.response.results)))
  }

  }

}



function fetchedGuardianArticles(articles){
  return {type:"FETCHED_GUARDIAN", articles}
}

function fetchingNewYorkTimesArticles(country){
  let today = new Date().toISOString().slice(0, 10).split("-")
  today[today.length-1] = "01"
  let month = today.join("")
  return(dispatch)=>{
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${country.name}&fq=news_desk:("Foreign")&begin_date=${month}&sort=newest&api-key=${NytKEY}`)
    .then(res=>res.json())
    .then(data=>dispatch(fetchedNewYorkTimesArticles(data.response.docs)))
  }
}

function fetchedNewYorkTimesArticles(articles){
  return {type:"FETCHED_NYT", articles}
}


function fetchingArticles(country){
    let today = new Date()
    today.setDate( today.getDate() - 7 )
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();
    let targetDate = (curr_year + "-" +"0"+ curr_month + "-" + curr_date)
  return(dispatch)=>{
    if(country.name === "Jordan"){
      fetch(`https://newsapi.org/v2/everything?q=Hashemite-Kingdom-of-Jordan&from=${targetDate}&sortBy=relevancy&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(articles=> {
        dispatch(fetchedArticles(articles))
      })
    }
    else{
      fetch(`https://newsapi.org/v2/everything?q=${country.name}&from=${targetDate}&sortBy=relevancy&apiKey=${NewsKey}`)
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

function searching(value){
  return {type: "SEARCHING", payload: value}
}

function clearSearch(){
  return{type:"CLEAR_SEARCH",payload:""}
}

function clearCountryNews(){
  return{type:"CLEAR_COUNTRY_NEWS",payload:{}}
}




export{clearCountryNews,clearSearch,searching,setUser,fetchedUserNews,fetchingUserNews,fetchedSavedArticles,fetchingSavedArticles,setCountry,fetchingBBC,fetchedBBC,fetchingCNN,fetchedCNN,currentUser,loggingInUser,loggedIn,loggingOut,fetchingArticles,fetchedArticles,fetchingCountries,fetchedCountries,fetchedLocalArticles,fetchingLocalArticles,creatingUser,fetchingGuardianArticles,fetchedGuardianArticles,fetchingNewYorkTimesArticles}
