import React from 'react'
import ArticleUserNewsCard from './ArticleUserNewsCard'
import {Card} from 'semantic-ui-react'
import {connect} from 'react-redux'

class ArticleUserNewsList extends React.Component{
  render(props){
    return(
      <div className="user-news-list">

        <h2>{this.props.countryName}</h2>
        {this.props.userCountryNews?

          <div className="user-news-countries-list">{this.props.userCountryNews[this.props.countryName].map((article,index)=>
            <Card.Group itemsPerRow={4}><ArticleUserNewsCard key={index} articleInfo={article}/></Card.Group>
          )}</div>
        :null}
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
