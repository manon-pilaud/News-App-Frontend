import React from 'react'
import {connect} from 'react-redux'
import ArticleCard from './ArticleCard'

class ArticleList extends React.Component{
  constructor(){
    super()
    this.state={
      clicked: false
    }
  }

  clicked=()=>{
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render(){
  return !this.props.articles?null:(
    <div className="articles-cont">
      <h3>News</h3>
      <button onClick={this.clicked}>Hide News</button>
      <input type="checkbox" id="switch"/><label for="switch">Toggle</label>
      {!this.state.clicked?
      <div>
        {this.props.articles.map((article,index) => (
          <ArticleCard
            key={index}
            articleInfo={article}
          />
        ))}
      </div>:null}
    </div>
  )
  }
}

const mapStateToProps = state => {
  return{
    articles: state.articles.articles
  }
}

export default connect(mapStateToProps)(ArticleList);
