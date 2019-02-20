const NewsKey = process.env.REACT_APP_NEWS_API_KEY;


function fetchedArticles(articles){
  return {type:"FETCHED_ARTICLES", articles}
}


function fetchingArticles(){
  return(dispatch)=>{
    fetch(`https://newsapi.org/v2/everything?q=kenya=&apiKey=${NewsKey}`)
    .then(res=>res.json())
    .then(articles=> {
      dispatch(fetchedArticles(articles))
    })
  }
}

export{fetchingArticles,fetchedArticles}
