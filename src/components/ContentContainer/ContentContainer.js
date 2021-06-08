import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import LinkedMapsContainer from '../LinkedMaps/LinkedMapsContainer';
import LineOfSightContainer from '../LineOfSight/LineOfSightContainer';
import MeasurementContainer from '../Measurement/MeasurementContainer';


export default function ContentContainer(props) {
  

  return (
    <>
      <Route path={props.tabIndex[0]}>
        <LinkedMapsContainer />
      </Route>
      <Route path={props.tabIndex[1]}>
        <LineOfSightContainer/>
      </Route>
      <Route path={props.tabIndex[2]}>
        <MeasurementContainer/>
      </Route>
      <Route exact path='/'>
        <Redirect to={props.tabIndex[0]}></Redirect>
      </Route>
    </>
  )
}
