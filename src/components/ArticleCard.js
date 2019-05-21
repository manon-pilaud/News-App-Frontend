import React from 'react'
import {connect} from 'react-redux'
import { Button,Icon} from 'semantic-ui-react'
import {addingToReadingList} from '../redux/action/ReadingListActions'
class ArticleCard extends React.Component{
  render(props){
    let {title,content,source,url,urlToImage} = this.props.articleInfo
    return(
      <div className="articleCard">
        <a href={url}>
        <center>
        <div>
          <h5>{title}</h5>
          <img className="cropped-2" alt={title} src={urlToImage}/>
        </div>
        </center>
      </a>
      {content && !content.includes("..") && !content.includes(",,") && !content.includes("%") && !content.includes("()")?
        <p>{content}</p>
        :null}
        <p>Source: {source.name}</p>
        {this.props.country && this.props.user && this.props.savedArticles?
        <center>
        <Button size="mini" basic color='blue' content='Blue'icon labelPosition='right' onClick={()=>this.props.addToReadingList(this.props.articleInfo,this.props.country.id)}><Icon name="add"/>Add to reading List</Button>
        </center>
      :null}
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
    addToReadingList: (articleInfo,country_id) => {dispatch(addingToReadingList(articleInfo,country_id))}
  }
}


export default (connect(mapStateToProps,mapDispatchToProps)(ArticleCard));
