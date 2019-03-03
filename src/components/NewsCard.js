import React from 'react'
export default class NewsCard extends React.Component{
  render(){
    return(
      <div>
        <a href={this.props.newsInfo.link}>
        <h5>{this.props.newsInfo.title}</h5>
        <p>{this.props.newsInfo.contentSnippet}</p>
        </a>
        <button>add to reading list</button>
      </div>
    )
  }
}
