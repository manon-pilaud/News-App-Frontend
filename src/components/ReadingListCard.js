import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'

class ReadingListCard extends React.Component{
  removeFromList=(article)=>{
    let target = this.props.readingList.find(articleFromList=> articleFromList.article_id === article.id)
    fetch(`http://localhost:3000/api/v1/reading_lists/${target.id}`,{
     method: "DELETE"})
    .then(response=>response.json())
    .then(data=>console.log(data))

  }

  render(){
    return(
      <div>
      <a>
      <Card.Group>
      <Card>
      <Card.Content>
        <Card.Header>{this.props.articleInfo.title}</Card.Header>
        <Image floated='left' size='large'  src={this.props.articleInfo.image_url}/>
        <Card.Description>
          {this.props.articleInfo.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button basic color='red' onClick={()=>this.removeFromList(this.props.articleInfo)}>
            Remove from reading list
          </Button>
      </Card.Content>
    </Card>
    </Card.Group>
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

export default (connect(mapStateToProps)(ReadingListCard))
