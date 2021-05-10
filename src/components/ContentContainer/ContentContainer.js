import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import LinkedMapsContainer from '../LinkedMaps/LinkedMapsContainer';


export default function ContentContainer(props) {
  

  return (
    <>
      <Route path={props.tabIndex[0]}>
        <LinkedMapsContainer />
      </Route>
      <Route path={props.tabIndex[1]}>
        Test
      </Route>
      <Route path={props.tabIndex[2]}>
        
      </Route>
      <Route exact path='/'>
        <Redirect to='/home'></Redirect>
      </Route>
    </>
  )
}
