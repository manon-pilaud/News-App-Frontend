import React from 'react'
export default class ArticleCard extends React.Component{
  render(props){
    let {title,content,source,url,urlToImage} = this.props.articleInfo
    return(
      <div>
        <a href={url}>
        <h5>{title}</h5>
        <img src={urlToImage}/>
      </a>
        <p>{content}</p>
        <p>{source.name}</p>
      </div>
    )
  }
}
