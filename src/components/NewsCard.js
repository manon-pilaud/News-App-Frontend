import React from 'react'
import {connect} from 'react-redux'
import { Button,Icon} from 'semantic-ui-react'
import {addingRSSToReadingList} from '../redux/action/ReadingListActions'
class NewsCard extends React.Component{
  render(){
    return(
      <div className="news-card">
        <a href={this.props.newsInfo.link}>
        <h5>{this.props.newsInfo.title}</h5>
        <p>{this.props.newsInfo.contentSnippet}</p>
        </a>
        {localStorage.token?
        <center><Button size="mini" basic color='blue' content='Blue'icon labelPosition='right' onClick={()=>this.props.addRSSToReadingList(this.props.newsInfo)}><Icon name="add"/>add to reading list</Button></center>
        :null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.currentUser,
    savedArticles: state.savedArticles
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    addRSSToReadingList: (articleInfo) => {dispatch(addingRSSToReadingList(articleInfo))}
  }
}


export default (connect(mapStateToProps,mapDispatchToProps)(NewsCard));
