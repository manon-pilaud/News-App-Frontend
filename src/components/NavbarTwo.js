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
          <Menu inverted pointing secondary size="huge">
            <Menu.Menu position='left'>
              <Menu.Item>
                 <Icon name="world"/>StayCurrent
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu id="centered-menu">
              <Link to="/feed">
                <Menu.Item name='Top Stories' active={activeItem === 'Top Stories'} onClick={this.handleItemClick}/>
              </Link>
              <Link to="/my-countries">
                <Menu.Item name='My Countries' active={activeItem === 'My Countries'} onClick={this.handleItemClick} />
              </Link>
              <Link to="/reading-list">
                <Menu.Item name='Reading List' active={activeItem === 'Reading List'} onClick={this.handleItemClick} />
              </Link>
              <Link to="/map">
                <Menu.Item name='map' active={activeItem === 'map'} onClick={this.handleItemClick}>
                  <Icon name='map marker alternate' />
                </Menu.Item>
              </Link>
            </Menu.Menu>
            <Menu.Menu position='right'>
            {this.props.currentUser?
              <Link to="/login">
                <Menu.Item name='Sign Out' active={activeItem === 'Sign Out'} onClick={this.handleItemClick} />
              </Link>
            :
              <Link to="/login">
                <Menu.Item name='Sign In' active={activeItem === 'Sign In'} onClick={this.handleItemClick} />
              </Link>
            }
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
