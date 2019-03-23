import React from 'react'
import {connect} from 'react-redux'
import { Button,Icon} from 'semantic-ui-react'
class ArticleCardGuardian extends React.Component{
  render(){
  let {webTitle,webUrl} = this.props.articleInfo
    return(
      <div>
        <a href={webUrl}>
        <div className="articleCard">
          <h3>{webTitle}</h3>
          <center>
            <img src="https://d1.awsstatic.com/case-studies/600x400_Guardian_Logo.ff53f7742c12197d84de817819af20ceb973ab4d.png" width="250" height="200"/>
          </center>
      </div>
      </a>
    </div>
    )
  }
}
export default ArticleCardGuardian
