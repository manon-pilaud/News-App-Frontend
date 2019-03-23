import React from 'react'
import {connect} from 'react-redux'
import ArticleCard from './ArticleCard'
import { Checkbox, Segment} from 'semantic-ui-react'

class LocalArticleList extends React.Component{
  render(){
  return this.props.localArticles?(
      <div className="all-articles">
            {this.props.localArticles.map((article,index) => (
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
    localArticles: state.localArticles.articles
  }
}

export default connect(mapStateToProps)(LocalArticleList);
