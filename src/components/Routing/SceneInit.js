import config from 'AgcShowcaseConfig';
import SceneView from '@arcgis/core/views/SceneView';
import RouteTask from '@arcgis/core/tasks/RouteTask';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import RouteParameters from '@arcgis/core/tasks/support/RouteParameters';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import FeatureSet from '@arcgis/core/tasks/support/FeatureSet';
import Map from '@arcgis/core/Map';


const initScene = (sceneDiv, layers) => {
  // The stops and route result will be stored in this layer
  
  var sceneMap = new Map({
    basemap: config.tabDefs.linkedMapSettings.sceneSettings.basemap,
    ground: config.tabDefs.linkedMapSettings.sceneSettings.ground,
    layers: layers
  });
  const sceneView = new SceneView({
    container: sceneDiv,
    map: sceneMap,
    environment: config.tabDefs.linkedMapSettings.sceneViewSettings.environment,
    center: [4.8357, 45.7640],
    zoom: 15
  });
  return sceneView;
}

const initRouting = (view, routeLayer) => {
  // Point the URL to a valid routing service
  var routeTask = new RouteTask({
    url: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
  });

  // Setup the route parameters
  var routeParams = new RouteParameters({
    stops: new FeatureSet(),
    outSpatialReference: {
      // autocasts as new SpatialReference()
      wkid: 3857
    }
  });

  // Define the symbology used to display the stops
  var stopSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    style: "cross",
    size: 15,
    outline: {
      // autocasts as new SimpleLineSymbol()
      width: 4
    }
  };

  // Define the symbology used to display the route
  var routeSymbol = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [0, 0, 255, 0.5],
    width: 5
  };

  // Adds a graphic when the user clicks the map. If 2 or more points exist, route is solved.
  view.on("click", addStop);

  function addStop(event) {
    // Add a point at the location of the map click
    var stop = new Graphic({
      geometry: event.mapPoint,
      symbol: stopSymbol
    });
    routeLayer.add(stop);

    // Execute the route task if 2 or more stops are input
    routeParams.stops.features.push(stop);
    if (routeParams.stops.features.length >= 2) {
      routeTask.solve(routeParams).then(showRoute);
    }
  }
  // Adds the solved route to the map as a graphic
  function showRoute(data) {
    var routeResult = data.routeResults[0].route;
    routeResult.symbol = routeSymbol;
    routeLayer.add(routeResult);
  }  
}

export default function initialize (sceneDiv) {
  var lyonSceneLayer = new SceneLayer(config.tabDefs.linkedMapSettings.demoSceneLayerSettings);
  var routeLayer = new GraphicsLayer();
  let view = initScene(sceneDiv, [lyonSceneLayer, routeLayer]);
  initRouting(view, routeLayer);
}