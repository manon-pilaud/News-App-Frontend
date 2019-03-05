import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const NewsOptions = [
{
  text: 'Sky News',
  value: 'Sky News',
  image: { avatar: true, src: 'https://www.easyicon.net/api/resizeApi.php?id=1106622&size=128' }
},
{
  text: 'Al Jazeera',
  value: 'Al Jazeera',
  image: { avatar: true, src: 'https://www.easyicon.net/api/resizeApi.php?id=1118274&size=128' }
},
{
  text: 'France 24',
  value: 'France 24',
  image: { avatar: true, src: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/FRANCE_24_logo.svg/1200px-FRANCE_24_logo.svg.png' }
},
{
  text: 'Bloomberg',
  value: 'Bloomberg',
  image: { avatar: true, src: 'https://www.easyicon.net/api/resizeApi.php?id=1090585&size=128' }
}
]
export default class LiveVideos extends React.Component{
  state={
    currentLiveStream: "Sky News"
    //Ternary with on menu drop down select from al J and France 2
  }

  setLiveNews=(e)=>{
    this.setState({
      currentLiveStream: e.target.textContent
    })
  }
  render(){
    return(
      <div>
        <Dropdown onChange={(e)=>this.setLiveNews(e)} placeholder='Select Live Stream' fluid selection options={NewsOptions} />
        {this.state.currentLiveStream === "Sky News"?
        <iframe width="420" height="315" src="https://www.youtube.com//embed/lrX6ktLg8WQ" frameBorder="0" allowFullScreen></iframe>
        : this.state.currentLiveStream === "Al Jazeera"?
        <iframe width="560" height="315" src="https://www.youtube.com/embed/oGwHtl4yQDg" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        : this.state.currentLiveStream === "France 24"?
        <iframe width="560" height="315" src="https://www.youtube.com/embed/J78SdCzzumA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        :<iframe width="560" height="315" src="https://www.youtube.com/embed/dp8PhLsUcFE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        }
      </div>
    )
  }
}
