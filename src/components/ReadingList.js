import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
import ReadingListCard from './ReadingListCard'
class ReadingList extends React.Component{
  render(){
    return !this.props.readingList?null:(
      <div>
        <Card.Group itemsPerRow={4}>
        {this.props.readingList.map((article,index)=><ReadingListCard key={index} articleInfo={article}/>)}
      </Card.Group>
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
