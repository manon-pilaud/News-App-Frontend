import React from 'react'
import ArticleUserNewsCard from './ArticleUserNewsCard'
import {Item} from 'semantic-ui-react'
import {connect} from 'react-redux'

class ArticleUserNewsList extends React.Component{
  render(props){
    return(
      <div>
        <h2>{this.props.countryName}</h2>
        {this.props.userCountryNews?
          <div>{this.props.userCountryNews[this.props.countryName].map((article,index)=>
            <Item.Group><ArticleUserNewsCard key={index} articleInfo={article}/></Item.Group>
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
