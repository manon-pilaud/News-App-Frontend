const NewsKey = process.env.REACT_APP_NEWS_API_KEY;


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
  }
}


function fetchingArticles(country){
  return(dispatch)=>{
    if(country.name === "Jordan"){
      fetch(`https://newsapi.org/v2/everything?q=Hashemite-Kingdom-of-Jordan‎=&apiKey=${NewsKey}`)
      .then(res=>res.json())
      .then(articles=> {
        dispatch(fetchedArticles(articles))
      })
    }
    else{
      fetch(`https://newsapi.org/v2/everything?q=${country.name}=&apiKey=${NewsKey}`)
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
    fetch(`http://localhost:3000/countries`)
    .then(res=>res.json())
    .then(countries=> {
      dispatch(fetchedCountries(countries))
    })
  }
}

export{fetchingArticles,fetchedArticles,fetchingCountries,fetchedCountries,fetchedLocalArticles,fetchingLocalArticles}
