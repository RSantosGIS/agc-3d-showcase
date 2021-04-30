import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import SceneView from '@arcgis/core/views/SceneView';
import Map from '@arcgis/core/Map';


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

      const sceneview = new SceneView({
        container: sceneDiv.current,
        map: map
      });
    }
  }, []);

  return <>
      <div className="mapDiv" ref={mapDiv}></div>
      <div className="sceneDiv" ref={sceneDiv}></div>
    </>;
}

export default App;
