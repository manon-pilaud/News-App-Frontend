import React from 'react'
import {connect} from 'react-redux'
import ReadingListCard from './ReadingListCard'
class ReadingList extends React.Component{
  render(){
    return !this.props.readingList?null:(
      <div>
        {this.props.readingList.map(article=><ReadingListCard key={article.id} articleInfo={article}/>)}
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    readingList: state.currentUser.articles
  }
}

export default (connect(mapStateToProps)(ReadingList))
