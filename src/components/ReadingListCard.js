import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

class ReadingListCard extends React.Component{
  render(){
    return(
      <div>
      <a>
      <Card.Group>
      <Card>
      <Card.Content>
        <Card.Header>{this.props.articleInfo.title}</Card.Header>
        <Image floated='center' size='large'  src={this.props.articleInfo.image_url}/>
        <Card.Description>
          {this.props.articleInfo.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button basic color='red'>
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




export default (ReadingListCard)
