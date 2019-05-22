import React from 'react'
import {connect} from 'react-redux'
import {Card,Button} from 'semantic-ui-react'
import {addingToReadingList} from '../redux/action/ReadingListActions'
class ArticleUserNewsCard extends React.Component{

  render(props){
    let {title,content,source,url,urlToImage} = this.props.articleInfo
    return(
        <Card className="news-list-card">
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <a href={url}>
          <img className="cropped-3" floated='left'  src={urlToImage}/>
          </a>
          <Card.Description>
            {content}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button basic color='green' onClick={()=>this.props.addToReadingList(this.props.articleInfo,this.props.country.id)} >
              Add to Reading List
            </Button>
        </Card.Content>

      </Card>
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


export default (connect(mapStateToProps,mapDispatchToProps)(ArticleUserNewsCard));
