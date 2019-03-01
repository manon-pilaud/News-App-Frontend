import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'
export default class CountryCard extends React.Component{
  render(){
    return(
      <div>
    <Card.Group>
      <Card>
      <Card.Content>
        <Image floated='right' size='mini' src={`https://www.countryflags.io/${this.props.country.flag}/shiny/64.png`} />
        <Card.Header>{this.props.country.name}</Card.Header>
        <Card.Meta>Some Country Info</Card.Meta>
        <Card.Description>
          Some Description
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red'>
            unfollow
          </Button>
        </div>
      </Card.Content>
    </Card>
    </Card.Group>
      </div>
    )
  }
}
