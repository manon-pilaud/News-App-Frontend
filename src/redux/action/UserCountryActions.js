import store from '../store'

function followingCountry(country,user){
  return(dispatch)=>{
    fetch('http://localhost:3000/api/v1/user_countries',{
     method: "POST",
     headers:{
       "Authentication": `Bearer ${localStorage.token}`,
       "Content-Type" : "application/json",
       "Accept" : "application/json"
     },
     body: JSON.stringify({
        user_id: user.user_id,
        country_id: country.id
     })
    })
    .then(response=>response.json())
    .then(data=>{dispatch(updateUserCountries(data))})
    .then(data=>{dispatch(followThisCountry(country))})
  }
}
  function updateUserCountries(data){
      return {type:"UPDATE_USER_COUNTRIES",data}
  }

  function followThisCountry(country,data){
    return {type:"FOLLOW_COUNTRY",country}
  }


function unfollowingCountry(country){
  return(dispatch)=>{
    let user_country = store.getState().currentUser.user_countries.find(userCountry=>userCountry.country_id === country.id)
    fetch(`http://localhost:3000/api/v1/user_countries/${user_country.id}`,{
     method: "DELETE"})
    .then(response=>response.json())
    .then(joinInfo=>{dispatch(removeRelationship(joinInfo))})
    .then(joinInfo=>{dispatch(unfollowThisCountry(country))})
    }
}

function removeRelationship(joinInfo){
  return{type:"REMOVE_COUNTRY_RELATIONSHIP",joinInfo}
}

function unfollowThisCountry(country){
  return{type:"UNFOLLOW_COUNTRY",country}
}

export{followingCountry,unfollowingCountry}
