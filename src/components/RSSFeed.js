import React from 'react'
import { Tab ,Segment} from 'semantic-ui-react'
import BBCNews from './BBCNews.js'
import CnnNews from './CnnNews.js'
import NYTNews from './NYTNews'

const panes = [
  { menuItem: 'BBC', render: () => <Tab.Pane><BBCNews/></Tab.Pane> },
  { menuItem: 'CNN', render: () => <Tab.Pane><CnnNews/></Tab.Pane> },
  { menuItem: 'New York Times', render: () => <Tab.Pane><NYTNews/></Tab.Pane> },
]

const RssFeeds = () =>
<Segment className="stream" style={{overflow: 'auto', maxHeight: 590 }}>
  <div>
     <Tab panes={panes} />
  </div>
 </Segment>

export default RssFeeds
