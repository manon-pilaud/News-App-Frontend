import React from 'react'
import {connect} from 'react-redux'
import { Button,Icon} from 'semantic-ui-react'
class ArticleCardNYT extends React.Component{
//REDUX FIX
    createArticle=(articleInfo,country_id)=>{
      let articleExists= this.props.savedArticles.find(savedArticle=>savedArticle.title === articleInfo.headline.main)
      // let image = ("https://static01.nyt.com/"+this.props.articleInfo.multimedia[0].url)
      let image = "https://bpi.bard.edu/wp-content/uploads/2017/08/New_York_Times_logo_variation.jpg"
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
            title: articleInfo.headline.main,
            description: articleInfo.snippet,
            article_url: articleInfo.web_url,
            image_url: image,
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
        .then(joinInfo=>this.props.updateArticleReadingList(joinInfo))
        .then(this.props.addArticleReadingList(data))
      }
    }
  render(){
    let{web_url,headline,snippet,multimedia} = this.props.articleInfo
    let image = "https://bpi.bard.edu/wp-content/uploads/2017/08/New_York_Times_logo_variation.jpg"
      return(
      <div>
        <div className="articleCard">
        <a href={web_url}>
          <center>
          <div id="linked">
            <h3>{headline.main}</h3>

              <img src={image} width="300" height="200"/>
              <p>{snippet}</p>
          </div>
          </center>
        </a>
        {this.props.country && this.props.user && this.props.savedArticles?
        <center>
        <Button size="mini" basic color='blue' content='Blue'icon labelPosition='right' onClick={()=>this.createArticle(this.props.articleInfo,this.props.country.id)}><Icon name="add"/>Add to reading List</Button>
        </center>
      :null}
        </div>

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
    updateArticleReadingList:(joinInfo)=>{dispatch({type:"UPDATE_READING_LIST",joinInfo})},
    addArticleReadingList:(data)=>{dispatch({type:"ADD_TO_READING_LIST",data})}
  }
}

export default (connect(mapStateToProps)(ArticleCardNYT));
