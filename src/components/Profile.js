import React from 'react'
let feedBBC = "http://feeds.bbci.co.uk/news/world/rss.xml"
let feedCNN ="http://rss.cnn.com/rss/edition_world.rss"
let feedReuters ="http://feeds.reuters.com/Reuters/worldNews"


let Parser = require('rss-parser');

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
let parser = new Parser();

const bbcArr = (async () => {
  let feed = await parser.parseURL(CORS_PROXY + "http://feeds.bbci.co.uk/news/world/rss.xml" );
  let bbcArray = []
  feed.items.forEach(item => {
    bbcArray.push(item)
  });
  return bbcArray
})();

bbcArr.then(data=>console.log(data))

export default class Profile extends React.Component{
  render(){
    return(
      <div>
      </div>
    )
  }
}
