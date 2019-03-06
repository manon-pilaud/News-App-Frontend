import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
import ReadingListCard from './ReadingListCard'
import { clearSearch } from '../redux/actionCreator'
import SearchBar from './CountrySearchBar'
class ReadingList extends React.Component{
  componentWillUnmount(){
    this.props.clearSearch()
  }
  render(){
    return !this.props.readingList?null:(
      <div>
        <SearchBar/>
        <Card.Group itemsPerRow={4} id="reading-list-section">
        {this.props.readingList.filter(
          r =>
            r.title.toLowerCase().includes(this.props.searchText.toLowerCase())
        ).map((article,index)=><ReadingListCard key={index} articleInfo={article}/>)}
      </Card.Group>
    </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    readingList: state.currentUser.articles,
    searchText: state.filters
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      clearSearch: () => {dispatch(clearSearch())}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(ReadingList))
