import React from 'react'
import { Tab ,Segment} from 'semantic-ui-react'
import GuardianList from './GuardianList'
import LocalArticleList from './LocalArticleList'


const panes = [
  { menuItem: 'New York Times', render: () => <Tab.Pane></Tab.Pane> },
  { menuItem: 'Guardian', render: () => <Tab.Pane><GuardianList/></Tab.Pane> },
  { menuItem: 'Local News', render: () => <Tab.Pane><LocalArticleList/></Tab.Pane> }
]

const ArticlesContainer = () =>
<Segment className="articles-cont" style={{overflow: 'auto', maxHeight: 1500 }}>
  <div >
     <Tab panes={panes} />
  </div>
 </Segment>

export default ArticlesContainer