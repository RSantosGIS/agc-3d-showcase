import React, {useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import initialize from './SceneInit';
import './Measurement.css';

export default function MeasurementContainer() {
  const sceneDiv = useRef(null);
  const distanceBtnRef = useRef(null);
  const areaBtnRef = useRef(null);
  const topBarRef = useRef(null);

  useEffect(() => {
    if (sceneDiv.current) {
      //Initialize application
      initialize(sceneDiv.current, {
        distanceBtnRef: distanceBtnRef.current,
        areaBtnRef: areaBtnRef.current,
        topBarRef: topBarRef.current
      });
    }
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <div className="mapDiv" ref={sceneDiv}></div>
        <div ref={topBarRef} className='topbar'>
          <button
            className="action-button esri-icon-measure-line"
            ref={distanceBtnRef}
            type="button"
            title="Measure distance between two points"
          ></button>
          <button className="action-button esri-icon-measure-area" 
            ref ={areaBtnRef}
            type="button" 
            title="Measure area"
          ></button>
        </div>
      </Grid>
    </>
  )
}
