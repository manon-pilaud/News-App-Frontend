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
    currentLiveStream: "skyNews"
    //Ternary with on menu drop down select from al J and France 2
  }
  render(){
    return(
      <div>
        <Dropdown placeholder='Select Live Stream' fluid selection options={NewsOptions} />
        <iframe width="420" height="315" src="https://www.youtube.com//embed/lrX6ktLg8WQ" frameborder="0" allowfullscreen></iframe>
      </div>
    )
  }
}
