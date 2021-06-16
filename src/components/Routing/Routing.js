import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import initialize from './SceneInit';
import './Routing.css';

export default function Routing() {
  const sceneDiv = useRef(null);

  //initializes the scene
  useEffect(() => {
    if (sceneDiv.current) {
      //Initialize application
      initialize(sceneDiv.current);
    }
  }, []);

  return (
    <Grid item xs={12}>
      <div className="mapDiv" ref={sceneDiv}></div>
      <div className="esri-widget paneDiv">
        <div>
          <p>
            Click on the map to add stops to the route. The route from the last stop to the newly added stop is
            calculated. If a stop is not reachable, then the last valid point is set as the starting point.
          </p>
        </div>
      </div>
    </Grid>
  )
}
