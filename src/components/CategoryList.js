import React from 'react'
import Category from './CategoryCard'

export default class CategoryList extends React.Component{
  render(){
    return(
      <div>
      <Category/>
      <Category/>
      <Category/>
      <Category/>
      <Category/>
      </div>
    )
  }
}
