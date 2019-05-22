import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'
import {removingFromReadingList} from '../redux/action/ReadingListActions'
class ReadingListCard extends React.Component{
  render(){
    return(
      <div>
      <a>
      <Card className="reading-list-card">
      <Card.Content>
        <Card.Header>{this.props.articleInfo.title}</Card.Header>
        <a href={this.props.articleInfo.article_url}>
          <img className="cropped-3" floated='left'  src={this.props.articleInfo.image_url}/>
        </a>
        <Card.Description>
          {this.props.articleInfo.description.substring(0, 200)}...
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button basic color='red' onClick={()=>this.props.removeFromReadingList(this.props.articleInfo)}>
            Remove from reading list
          </Button>
      </Card.Content>
    </Card>
    </a>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    readingList: state.currentUser.reading_lists
  }
}

const mapDispatchToProps=dispatch=>{
  return{
  removeFromReadingList: (articleInfo) => {dispatch(removingFromReadingList(articleInfo))}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(ReadingListCard))
