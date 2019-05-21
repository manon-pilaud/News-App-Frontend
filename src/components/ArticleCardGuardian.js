import React from 'react'
import {connect} from 'react-redux'
import { Button,Icon} from 'semantic-ui-react'
import {addingGuardianToReadingList} from '../redux/action/ReadingListActions'
class ArticleCardGuardian extends React.Component{
  render(){
  let {webTitle,webUrl} = this.props.articleInfo
    return(
      <div>
        <div className="articleCard">
          <a href={webUrl}>
            <center>
            <div id="linked">
              <h3>{webTitle}</h3>

                <img src="https://d1.awsstatic.com/case-studies/600x400_Guardian_Logo.ff53f7742c12197d84de817819af20ceb973ab4d.png" width="250" height="200"/>

            </div>
            </center>
          </a>
          {this.props.country && this.props.user && this.props.savedArticles?
          <center>
          <Button size="mini" basic color='blue' content='Blue'icon labelPosition='right' onClick={()=>this.props.addGuardianToReadingList(this.props.articleInfo,this.props.country.id)}><Icon name="add"/>Add to reading List</Button>
          </center>
        :null}
      </div>

    </div>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    country: state.currentCountry,
    user: state.currentUser,
    savedArticles: state.savedArticles
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      addGuardianToReadingList: (articleInfo,country_id) => {dispatch(addingGuardianToReadingList(articleInfo,country_id))}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(ArticleCardGuardian));
