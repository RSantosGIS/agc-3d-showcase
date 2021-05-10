import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import initialize from '../LinkedMaps/MapInit';

export default function LinkedMapsContainer() {
  const mapDiv = useRef(null);
  const sceneDiv = useRef(null);

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
