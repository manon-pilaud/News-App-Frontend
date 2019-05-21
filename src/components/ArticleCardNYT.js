import React from 'react'
import {connect} from 'react-redux'
import { Button,Icon} from 'semantic-ui-react'
import {addingNYTToReadingList} from '../redux/action/ReadingListActions'
class ArticleCardNYT extends React.Component{
  render(){
    let{web_url,headline,snippet,multimedia} = this.props.articleInfo
    let image = "https://bpi.bard.edu/wp-content/uploads/2017/08/New_York_Times_logo_variation.jpg"
      return(
      <div>
        <div className="articleCard">
        <a href={web_url}>
          <center>
          <div id="linked">
            <h3>{headline.main}</h3>

              <img src={image} width="300" height="200"/>
              <p>{snippet}</p>
          </div>
          </center>
        </a>
        {this.props.country && this.props.user && this.props.savedArticles?
        <center>
        <Button size="mini" basic color='blue' content='Blue'icon labelPosition='right' onClick={()=>this.props.addNYTReadingList(this.props.articleInfo,this.props.country.id)}><Icon name="add"/>Add to reading List</Button>
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
      addNYTReadingList: (articleInfo,country_id) => {dispatch(addingNYTToReadingList(articleInfo,country_id))}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(ArticleCardNYT));
