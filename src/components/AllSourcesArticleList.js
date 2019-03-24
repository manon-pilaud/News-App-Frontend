import React from 'react'
import {connect} from 'react-redux'
import ArticleCard from './ArticleCard'
import { Checkbox, Segment} from 'semantic-ui-react'

class AllSourcesArticleList extends React.Component{
  render(){
  return this.props.articles?(
        <div>
          {this.props.articles.map((article,index) => (
            <ArticleCard
              key={index}
              articleInfo={article}
            />
          ))}
        </div>
  ):null
  }
}

const mapStateToProps = state => {
  return{
    articles: state.articles.articles
  }
}

export default connect(mapStateToProps)(AllSourcesArticleList);
