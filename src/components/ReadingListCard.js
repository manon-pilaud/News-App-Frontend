import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'

class ReadingListCard extends React.Component{
  removeFromList=(article)=>{
    let target = this.props.readingList.find(articleFromList=> articleFromList.article_id === article.id)
    fetch(`http://localhost:3000/api/v1/reading_lists/${target.id}`,{
     method: "DELETE"})
    .then(response=>response.json())
    .then(joinInfo=>this.props.removeRelationshipRL(joinInfo))
    .then(this.props.removeThisFromList(article))

  }

  render(){
    return(
      <div>
      <a>
      <Card className="reading-list-card">
      <Card.Content>
        <Card.Header>{this.props.articleInfo.title}</Card.Header>
        <a href={this.props.articleInfo.article_url}>
          <img className="cropped-2" floated='left'  src={this.props.articleInfo.image_url}/>
        </a>
        <Card.Description>
          {this.props.articleInfo.description.substring(0, 200)}...
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button basic color='red' onClick={()=>this.removeFromList(this.props.articleInfo)}>
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
      removeRelationshipRL:(joinInfo)=>{dispatch({type:"REMOVE_RL_RELATIONSHIP",joinInfo})},
      removeThisFromList:(article)=>{dispatch({type:"REMOVE_FROM_LIST",article})}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(ReadingListCard))
