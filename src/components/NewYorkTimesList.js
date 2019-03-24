import React from 'react'
import {connect} from 'react-redux'
import ArticleCardNYT from './ArticleCardNYT'
import { Checkbox, Segment } from 'semantic-ui-react'

class NYTList extends React.Component{
  render(){
    console.log(this.props.nytArticles)
  return this.props.nytArticles?(

    <div>
      {this.props.nytArticles.map((article,index)=><ArticleCardNYT key={index} articleInfo={article}/>)}
    </div>
  ):null
  }
}

const mapStateToProps = state => {
  return{
    nytArticles: state.nytArticles
  }
}

export default connect(mapStateToProps)(NYTList);
