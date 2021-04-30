import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import SceneView from '@arcgis/core/views/SceneView';
import Map from '@arcgis/core/Map';
import Grid from '@material-ui/core/Grid';

import "./App.css"; 

function App() {

  const mapDiv = useRef(null);
  const sceneDiv = useRef(null);
  
  useEffect(() => {
    var map = new Map({
      basemap: "satellite"
    });
    if (mapDiv.current && sceneDiv.current) {
      /**
       * Initialize application
       */

      const mapView = new MapView({
        container: mapDiv.current,
        map: map,
        constraints: {
          // Disable zoom snapping to get the best synchronization
          snapToZoom: false
        }
      });
      const sceneView = new SceneView({
        container: sceneDiv.current,
        map: map
      });

      const views = [sceneView, mapView];
      let active;

      const sync = (source) => {
        if (!active || !active.viewpoint || active !== source) {
          return;
        }

        for (const view of views) {
          if (view !== active) {
            view.viewpoint = active.viewpoint;
          }
        }
      };

      Promise.all([sceneView.when(), mapView.when()]).then(()=> {
        //all elements ready
        sceneView.watch(["interacting", "animation"], () => {
          active = sceneView;
          sync(active);
        });
      
        sceneView.watch("viewpoint", () => sync(sceneView));
    
        mapView.watch(["interacting", "animation"], () => {
          active = mapView;
          sync(active);
        });
      
        mapView.watch("viewpoint", () => sync(mapView));
      })
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
