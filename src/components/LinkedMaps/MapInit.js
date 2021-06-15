import MapView from "@arcgis/core/views/MapView";
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Legend from '@arcgis/core/widgets/Legend';
import Map from '@arcgis/core/Map';
import config from 'AgcShowcaseConfig';

/**
 * Initializes the renderer based on the settings in the config
 * @returns 
 */
const initRenderer = () => {
  return config.tabDefs.linkedMapSettings.renderer;
}

/**
 * Initializes the popups based on the settings in the config
 * @returns 
 */
const initPopups = () => {
  return config.tabDefs.linkedMapSettings.demoFeaturePopuptemplate;
};

/**
 * Initializes the map, given a list of layers to display and an html div to put it in
 * @param {*} mapDiv 
 * @param {*} layers 
 * @returns 
 */
const initMapView = (mapDiv, layers) =>{
  //Maps
  var cartesianMap = new Map({
    basemap: config.tabDefs.linkedMapSettings.mapSettings.basemap,
    layers: layers
  });
  const mapView = new MapView({
    container: mapDiv,
    map: cartesianMap,
    constraints: {
      // Disable zoom snapping to get the best synchronization
      snapToZoom: false
    }
  });
  return mapView;
}

/**
 * Initializes the scene, given a list of layers to display and an html div to put it in
 * @param {*} sceneDiv 
 * @param {*} layers 
 * @returns 
 */
const initSceneView = (sceneDiv, layers) => {
  var sceneMap = new Map({
    basemap: config.tabDefs.linkedMapSettings.sceneSettings.basemap,
    ground: config.tabDefs.linkedMapSettings.sceneSettings.ground,
    layers: layers
  });
  const sceneView = new SceneView({
    container: sceneDiv,
    map: sceneMap,
    environment: config.tabDefs.linkedMapSettings.sceneViewSettings.environment
  });
  return sceneView;
};

/**
 * Initializes the legend widgets on a target map and scene view
 * @param {*} mapView 
 * @param {*} sceneView 
 */
const initWidgets = (mapView, sceneView) => {
  var mapLegend = new Legend({
    view: mapView
  });
  mapView.ui.add(mapLegend, config.tabDefs.linkedMapSettings.legendSettings.uiLocation);
  var sceneLegend = new Legend({
    view: sceneView
  });

  sceneView.ui.add(sceneLegend, config.tabDefs.linkedMapSettings.legendSettings.uiLocation);
};

/**
 * Initializes viewport manipulation event handling, which keeps the two maps in sync
 * @param {} mapView 
 * @param {*} sceneView 
 */
const initEventHandling = (mapView, sceneView) => {
  const views = [mapView, sceneView];
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

    //sync
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

export default function initialize (mapDiv, sceneDiv) {
  let renderer = initRenderer();
  let template = initPopups();

  //Layers
  var lyonSceneLayer = new SceneLayer(config.tabDefs.linkedMapSettings.demoSceneLayerSettings);
  var hurricaneLayer2d = new FeatureLayer({
    template : template,
    ...config.tabDefs.linkedMapSettings.demoFeatureLayerSettings
  });
  var hurricaneLayer3d = new FeatureLayer({
    renderer: renderer,
    popupTemplate: template,
    ...config.tabDefs.linkedMapSettings.demoFeatureLayerSettings
  });

  //Views
  let mapView = initMapView(mapDiv, [hurricaneLayer2d]);
  let sceneView = initSceneView(sceneDiv, [hurricaneLayer3d, lyonSceneLayer]);

  //Widgets
  initWidgets(mapView, sceneView);
  //Event handling
  initEventHandling(mapView, sceneView);



}

