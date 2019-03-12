import React from 'react'
import {Link} from 'react-router-dom'
import {Icon, Menu, Segment, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
class NavbarTwo extends React.Component{
  state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state

      return (
        <Segment inverted  id="navbar-semantic">
          <Menu inverted pointing secondary>
            <Menu.Menu position='left'>
              <Menu.Item>
                 <Icon name="world"/>StayCurrent
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu id="centered-menu">
              <Menu.Item name='Top Stories' active={activeItem === 'Top Stories'} onClick={this.handleItemClick}/>
              <Menu.Item name='My Countries' active={activeItem === 'My Countries'} onClick={this.handleItemClick} />
              <Menu.Item name='Reading List' active={activeItem === 'Reading List'} onClick={this.handleItemClick} />
              <Menu.Item name='map' active={activeItem === 'map'} onClick={this.handleItemClick}>
                <Icon name='map marker alternate' />
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position='right'>
              <Menu.Item name='Sign Out' active={activeItem === 'Sign Out'} onClick={this.handleItemClick} />
            </Menu.Menu>
          </Menu>
        </Segment>
      )
    }
}

const mapStateToProps=state=>{
  return{
    currentUser: state.currentUser
  }
}

export default (connect(mapStateToProps)(NavbarTwo));
