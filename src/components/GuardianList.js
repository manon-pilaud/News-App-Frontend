import React from 'react'
import {connect} from 'react-redux'
import ArticleCardGuardian from './ArticleCardGuardian'
import { Checkbox, Segment } from 'semantic-ui-react'

class GuardianList extends React.Component{
  render(){
  return this.props.guardianArticles?(

    <div>
      {this.props.guardianArticles.map((article,index)=><ArticleCardGuardian key={index} articleInfo={article}/>)}
    </div>
  ):null
  }
}

const mapStateToProps = state => {
  return{
    guardianArticles: state.guardianArticles
  }
}

export default connect(mapStateToProps)(GuardianList);
