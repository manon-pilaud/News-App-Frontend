import React from 'react'
import {connect} from 'react-redux'
import ArticleCard from './ArticleCard'


const ArticleList = props => {
  return !props.articles?null:(
    <div>
        {props.articles.map((article,index) => (
          <ArticleCard
            key={index}
            articleInfo={article}
          />
        ))}
    </div>
  )
}

const mapStateToProps = state => {
  return{
    articles: state.articles.articles
  }
}

export default connect(mapStateToProps)(ArticleList);
