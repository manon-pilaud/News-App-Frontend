import React from 'react'
import {connect} from 'react-redux'
class ArticleCard extends React.Component{

  createArticle=(articleInfo,country_id)=>{
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
        country_id: country_id
     })
   })
   .then(response=>response.json())
   .then(data=>this.addToReadingList(data))
  }

  addToReadingList=(data)=>{
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


  render(props){
    let {title,content,source,url,urlToImage} = this.props.articleInfo
    return(
      <div className="articleCard">
        <a href={url}>
        <center>
        <h5>{title}</h5>
        </center>
        <img className="crop" alt={title} src={urlToImage}/>
      </a>
      {content && !content.includes("..") && !content.includes(",,") && !content.includes("%") && !content.includes("()")?
        <p>{content}</p>
        :null}
        <p>Source: {source.name}</p>
        <button onClick={()=>this.createArticle(this.props.articleInfo,this.props.country.id)}>Add to reading List</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    country: state.currentCountry,
    user: state.currentUser
  }
}


export default (connect(mapStateToProps)(ArticleCard));
