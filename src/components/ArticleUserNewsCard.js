import React from 'react'
import {connect} from 'react-redux'
import { Image, Item } from 'semantic-ui-react'
class ArticleUserNewsCard extends React.Component{

  createArticle=(articleInfo,country_id)=>{
    let articleExists= this.props.savedArticles.find(savedArticle=>savedArticle.title === articleInfo.title)
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
  }

  addToReadingList=(data)=>{
    if(this.props.user.articles.find(article=> article.id === data.id)){
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
      .then(joinInfo=>this.props.updateReadingList(joinInfo))
      .then(this.props.addToReadingList(data))
    }
  }


  render(props){
    let {title,content,source,url,urlToImage} = this.props.articleInfo
    return(
      <div>
        <Item>
      <Item.Content>
        <Item.Header as='a'>{title}</Item.Header>
        <Item.Description>
        <a href={url}>
          <Image src={urlToImage} size="medium" />
        </a>
        </Item.Description>
        <Item.Meta>{content}</Item.Meta>
        <Item.Extra>{source.name}</Item.Extra>
      </Item.Content>
      {localStorage.token?
      <button onClick={()=>this.createArticle(this.props.articleInfo,this.props.country.id)}>Add to reading List</button>
      :null}
    </Item>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    country: state.currentCountry,
    user: state.currentUser,
    savedArticles: state.savedArticles
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    updateReadingList:(joinInfo)=>{dispatch({type:"UPDATE_READING_LIST",joinInfo})},
    addToReadingList:(data)=>{dispatch({type:"ADD_TO_READING_LIST",data})}
  }
}


export default (connect(mapStateToProps,mapDispatchToProps)(ArticleUserNewsCard));
