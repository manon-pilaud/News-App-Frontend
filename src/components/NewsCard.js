import React from 'react'
import {connect} from 'react-redux'
class NewsCard extends React.Component{
  createArticle=(article)=>{
    console.log(article)
    let articleExists= this.props.savedArticles.find(savedArticle=>savedArticle.title === article.title)
    if (!!articleExists){
      this.addToReadingList(articleExists)
    }
    else{
      fetch('http://localhost:3000/api/v1/articles',{
       method: "POST",
       headers:{
         "Content-Type" : "application/json",
         "Accept" : "application/json"
       },
       body: JSON.stringify({
          title: article.title,
          description: article.contentSnippet,
          article_url: article.link,
          image_url: "https://ak6.picdn.net/shutterstock/videos/2233546/thumb/1.jpg",
          country_id: 196
       })
     })
     .then(response=>response.json())
     .then(data=>this.addToReadingList(data))
    }
  }

  addToReadingList=(data)=>{
    if(this.props.user.reading_lists.find(article=> article.article_id === data.id)){
      alert("Pshhht you already added this to your reading list")
    }
    else{
       fetch('http://localhost:3000/api/v1/reading_lists',{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({
           article_id: data.id,
           user_id: this.props.user.user_id
        })
      })
      .then(response=>response.json())
      .then(data=>console.log(data))
    }
  }
  render(){
    return(
      <div>
        <a href={this.props.newsInfo.link}>
        <h5>{this.props.newsInfo.title}</h5>
        <p>{this.props.newsInfo.contentSnippet}</p>
        </a>
        {localStorage.token?
        <button onClick={()=>this.createArticle(this.props.newsInfo)}>add to reading list</button>
        :null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.currentUser,
    savedArticles: state.savedArticles
  }
}


export default (connect(mapStateToProps)(NewsCard));
