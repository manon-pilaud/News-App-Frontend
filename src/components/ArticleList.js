import React from 'react'
import {connect} from 'react-redux'
import ArticleCard from './ArticleCard'
import { Checkbox, Segment } from 'semantic-ui-react'

class ArticleList extends React.Component{
  constructor(){
    super()
    this.state={
      clicked: false,
      toggled: false
    }
  }

  clicked=()=>{
    this.setState({
      clicked: !this.state.clicked
    })
  }

  toggled=()=>{
    this.setState({
      toggled: !this.state.toggled
    })
  }

  render(){

  return this.props.articles && this.props.localArticles?(



    <div className="articles-cont">
      <center><h2>News</h2></center>
      <div className="toggled-div">
      <button className="toggled_button" onClick={this.clicked}>Hide News</button>
        <Segment compact>
       <Checkbox slider onChange={this.toggled}/>
     </Segment>
     </div>
     {this.state.toggled?<center><h3>Local Sources</h3></center>:<center><h3>All Sources</h3></center>}
      {!this.state.clicked?
      <Segment style={{overflow: 'auto', maxHeight: 1200 }}>
      <div className="all-articles">
        {this.state.toggled?
          <div>
            {this.props.localArticles.map((article,index) => (
              <ArticleCard
                key={index}
                articleInfo={article}
              />
            ))}
          </div>
          :
        <div>
          {this.props.articles.map((article,index) => (
            <ArticleCard
              key={index}
              articleInfo={article}
            />
          ))}
        </div>
      }
      </div>
      </Segment>
      :null}
      </div>
  ):null
  }
}

const mapStateToProps = state => {
  return{
    articles: state.articles.articles,
    localArticles: state.localArticles.articles
  }
}

export default connect(mapStateToProps)(ArticleList);
