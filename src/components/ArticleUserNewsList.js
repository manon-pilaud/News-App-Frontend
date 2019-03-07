import React from 'react'
import ArticleUserNewsCard from './ArticleUserNewsCard'
import {Card} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {  Flag,Segment } from 'semantic-ui-react'
class ArticleUserNewsList extends React.Component{
  render(props){
    return !this.props.userCountryNews?null:(
      <div>
        <h2>{this.props.countryName} <Flag size="medium" name={this.props.countryName.toLowerCase()}/></h2>
      <Card.Group id="user-news-countries-list" itemsPerRow={5}>
          {this.props.userCountryNews[this.props.countryName].map((article,index)=>
            <ArticleUserNewsCard key={index} articleInfo={article}/>
          )}
      </Card.Group>
    </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    userCountryNews: state.userCountryNews
  }
}

export default (connect(mapStateToProps)(ArticleUserNewsList))
