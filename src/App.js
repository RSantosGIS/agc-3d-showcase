import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import SceneView from '@arcgis/core/views/SceneView';
import Map from '@arcgis/core/Map';


import "./App.css"; 

function App() {

  const mapDiv = useRef(null);
  // const sceneDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
       var map = new Map({
        basemap: "satellite"
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map
      });

      // const sceneView = new SceneView({
      //   container: sceneDiv.current,
      //   map: webmap
      // });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
