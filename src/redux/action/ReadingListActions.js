import store from '../store'

function addingToReadingList(articleInfo,countryId){
  return(dispatch)=>{
    let articleExists = store.getState().savedArticles.find(savedArticle=>savedArticle.title === articleInfo.title)
    if (!articleExists){
      fetch('http://localhost:3000/api/v1/articles',{
       method: "POST",
       headers:{
         "Content-Type" : "application/json",
         "Accept" : "application/json"
       },
       body: JSON.stringify({
          title: articleInfo.title,
          description: articleInfo.description,
          article_url: articleInfo.url,
          image_url: articleInfo.urlToImage,
          country_id: countryId
       })
     })
     .then(response=>response.json())
     .then(data=>{dispatch
       (addToReadingList(data))
     })
    }
    else{
      dispatch(addToReadingList(articleExists))
    }
  }
}

function addingGuardianToReadingList(articleInfo,countryId){
  return(dispatch)=>{
    let articleExists= store.getState().savedArticles.find(savedArticle=>savedArticle.title === articleInfo.webTitle)
    if (!articleExists){
      fetch('http://localhost:3000/api/v1/articles',{
       method: "POST",
       headers:{
         "Content-Type" : "application/json",
         "Accept" : "application/json"
       },
       body: JSON.stringify({
         title: articleInfo.webTitle,
         description: articleInfo.webTitle,
         article_url: articleInfo.webUrl,
         image_url: "https://d1.awsstatic.com/case-studies/600x400_Guardian_Logo.ff53f7742c12197d84de817819af20ceb973ab4d.png",
         country_id: countryId
       })
     })
     .then(response=>response.json())
     .then(data=>{dispatch
       (addToReadingList(data))
     })
    }
    else{
      dispatch(addToReadingList(articleExists))
    }
  }
}

function addingNYTToReadingList(articleInfo,countryId){
  return(dispatch)=>{
    let articleExists= store.getState().savedArticles.find(savedArticle=>savedArticle.title === articleInfo.headline.main)
    if (!articleExists){
      fetch('http://localhost:3000/api/v1/articles',{
       method: "POST",
       headers:{
         "Content-Type" : "application/json",
         "Accept" : "application/json"
       },
       body: JSON.stringify({
         title: articleInfo.headline.main,
         description: articleInfo.snippet,
         article_url: articleInfo.web_url,
         image_url: "https://bpi.bard.edu/wp-content/uploads/2017/08/New_York_Times_logo_variation.jpg",
         country_id: countryId
       })
     })
     .then(response=>response.json())
     .then(data=>{dispatch
       (addToReadingList(data))
     })
    }
    else{
      dispatch(addToReadingList(articleExists))
    }
  }
}


function addToReadingList(data){
  return(dispatch)=> {
    let currentUser = store.getState().currentUser
    if(!currentUser.articles.find(article=> article.id === data.id)){
       fetch('http://localhost:3000/api/v1/reading_lists',{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({
           article_id: data.id,
           user_id: currentUser.user_id
        })
      })
      .then(response=>response.json())
      .then(joinInfo => {
        dispatch(updateReadingList(joinInfo))
      })
      .then(joinInfo=>{
          dispatch(addedToReadingList(data))
        }
      )

    }
  }
}

function updateReadingList(joinInfo){
  return {type:"UPDATE_READING_LIST",joinInfo}
}

function addedToReadingList(data){
  return {type:"ADD_TO_READING_LIST",data}
}


export{addingToReadingList,addingGuardianToReadingList,addingNYTToReadingList}
