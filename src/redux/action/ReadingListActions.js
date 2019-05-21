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


export{addingToReadingList}
