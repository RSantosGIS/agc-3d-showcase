import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import SceneView from '@arcgis/core/views/SceneView';
import Map from '@arcgis/core/Map';
import Grid from '@material-ui/core/Grid';

import "./App.css"; 

function App() {

  const mapDiv = useRef(null);
  const sceneDiv = useRef(null);
  var map = new Map({
    basemap: "satellite"
  });

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const view = new MapView({
        container: mapDiv.current,
        map: map
      });
    }
  }, []);

  useEffect(() => {
    if (sceneDiv.current) {

      const sceneView = new SceneView({
        container: sceneDiv.current,
        map: map
      });
    }
  }, []);

  return <>
  <Grid className="gridRoot" container>
    <Grid  item xs={6}>
      <div className="mapDiv" ref={mapDiv}></div>
    </Grid>
    <Grid item xs={6}>
      <div className="mapDiv" ref={sceneDiv}></div>
    </Grid>
  </Grid>
  </>;
}

export default App;
