import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import initialize from './SceneInit';

/**
 * Component for displaying the LineOfSight demonstration
 * @author santosrj
 */
export default function LineOfSightContainer() {
  const sceneDiv = useRef(null);

  //initializes the scene
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
