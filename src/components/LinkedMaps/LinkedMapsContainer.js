import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import initialize from '../LinkedMaps/MapInit';

/**
 * Component for displaying the Linked Maps demonstration
 * @author santosrj
 */
export default function LinkedMapsContainer() {
  const mapDiv = useRef(null);
  const sceneDiv = useRef(null);

  //initializes the 2d map and the 3d scene
  useEffect(() => {
    if (mapDiv.current && sceneDiv.current) {
      //Initialize application
      initialize(mapDiv.current, sceneDiv.current);
    }
  }, []);

  return (
    <>
      <Grid  item xs={6}>
        <div className="mapDiv" ref={mapDiv}></div>
      </Grid>
      <Grid item xs={6}>
        <div className="mapDiv" ref={sceneDiv}></div>
      </Grid>
    </>
  )
}
