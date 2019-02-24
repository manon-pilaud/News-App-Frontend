import React from 'react'
import {connect} from 'react-redux'
import ArticleCard from './ArticleCard'

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
  return !this.props.articles || !this.props.localArticles?null:(
    <div className="articles-cont">
      <h3>News</h3>
      <button onClick={this.clicked}>Hide News</button>
      <input type="checkbox" id="switch" onChange={this.toggled}/><label htmlFor="switch">Toggle</label>
      {!this.state.clicked?
      <div className="all-articles">
        {!this.state.toggled?
        <div>
          {this.props.articles.map((article,index) => (
            <ArticleCard
              key={index}
              articleInfo={article}
            />
          ))}
        </div>
        :
        <div>
          {this.props.localArticles.map((article,index) => (
            <ArticleCard
              key={index}
              articleInfo={article}
            />
          ))}
        </div>}
      </div>
      :null}
    </div>
  )
  }
}

const mapStateToProps = state => {
  return{
    articles: state.articles.articles,
    localArticles: state.localArticles.articles
  }
}

export default connect(mapStateToProps)(ArticleList);
