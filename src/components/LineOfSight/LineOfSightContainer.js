import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import initialize from './SceneInit';

export default function LineOfSightContainer() {
  const sceneDiv = useRef(null);

  useEffect(() => {
    if (sceneDiv.current) {
      //Initialize application
      initialize(sceneDiv.current);
    }
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <div className="mapDiv" ref={sceneDiv}></div>
      </Grid>
    </>
  )
}
