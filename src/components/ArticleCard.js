import React from 'react'
export default class ArticleCard extends React.Component{

  addToReadingList=(articleInfo)=>{
    console.log("attemping to add with:",articleInfo)
  }
  render(props){
    let {title,content,source,url,urlToImage} = this.props.articleInfo
    return(
      <div className="articleCard">
        <a href={url}>
        <center>
        <h5>{title}</h5>
        </center>
        <img className="crop" alt={title} src={urlToImage}/>
      </a>
      {content && !content.includes("..") && !content.includes(",,") && !content.includes("%") && !content.includes("()")?
        <p>{content}</p>
        :null}
        <p>Source: {source.name}</p>
        <button onClick={()=>this.addToReadingList(this.props.articleInfo)}>Add to reading List</button>
      </div>
    )
  }
}
