import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import LinkedMapsContainer from '../LinkedMaps/LinkedMapsContainer';
import LineOfSightContainer from '../LineOfSight/LineOfSightContainer';
import MeasurementContainer from '../Measurement/MeasurementContainer';
import Routing from '../Routing/Routing';


/**
 * Component that handles routing to the various content items and displays them when they are navigated to
 * @param {} tabIndex the array of paths as determined by the tabs.  determines routing
 * @author santosrj 
 */
export default function ContentContainer({tabIndex}) {
  

  return (
    <>
      <Route path={tabIndex[0]}>
        <LinkedMapsContainer />
      </Route>
      <Route path={tabIndex[1]}>
        <LineOfSightContainer/>
      </Route>
      <Route path={tabIndex[2]}>
        <MeasurementContainer/>
      </Route>
      <Route path={tabIndex[3]}>
        <Routing/>
      </Route>
      <Route exact path='/'>
        <Redirect to={tabIndex[0]}></Redirect>
      </Route>
    </>
  )
}
