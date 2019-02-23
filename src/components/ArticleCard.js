import React from 'react'
export default class ArticleCard extends React.Component{
  render(props){
    let {title,content,source,url,urlToImage} = this.props.articleInfo
    return(
      <div>
        <a href={url}>
        <center>
        <h5>{title}</h5>
        </center>
        <img className="crop" src={urlToImage}/>
      </a>
        <p>{content}</p>
        <p>Source: {source.name}</p>
      </div>
    )
  }
}
