import WebScene from '@arcgis/core/WebScene';
import Graphic from '@arcgis/core/Graphic';
import SceneView from '@arcgis/core/views/SceneView';
import LineOfSight from '@arcgis/core/widgets/LineOfSight';
import LayerList from '@arcgis/core/widgets/LayerList';
import * as watchUtils from '@arcgis/core/core/watchUtils';
import config from 'AgcShowcaseConfig';

/**
 * Initializes the 3D scene usin the specified html container
 * @param {*} sceneDiv  
 */
const initScene = (sceneDiv) => {
  const scene = new WebScene({
    portalItem: {
      id: '82127fea11d6439abba3318cb93252f7'
    }
  });

  const view = new SceneView({
    map: scene,
    container: sceneDiv
  });
  return view;
}

/**
 * Initiazes the LOS widgets on the specified scene view
 * @param {} sceneView 
 */
const initWidgets = (sceneView) => {
  /**
   * LOS
   */
  const lineOfSight = new LineOfSight({
    view: sceneView,
  });
  sceneView.ui.add(lineOfSight, config.tabDefs.losSettings.losWidgetSettings.uiLocation);

  const viewModel = lineOfSight.viewModel;

  // watch when observer location changes
  viewModel.watch("observer", (value) => {
      setIntersectionMarkers();
  });

  // watch when a new target is added or removed
  viewModel.targets.on("change", (event) => {
    event.added.forEach((target) => {
      setIntersectionMarkers();
      // for each target watch when the intersection changes
      target.watch("intersectedLocation", setIntersectionMarkers);
    });
  });

  // an inverted cone marks the intersection that occludes the view
  const intersectionSymbol = {
    type: "point-3d",
    symbolLayers: [{
      type: "object",
      resource: { primitive: "inverted-cone"},
      material: { color: [255, 100, 100] },
      height: 10,
      depth: 10,
      width: 10,
      anchor: "relative",
      anchorPosition: { x: 0, y: 0, z: -0.7 }
    }]
  };

  //sets LoS intersection block symbology
  function setIntersectionMarkers() {
    sceneView.graphics.removeAll();
    viewModel.targets.forEach((target) => {
      if (target.intersectedLocation) {
        const graphic = new Graphic({
          symbol: intersectionSymbol,
          geometry: target.intersectedLocation
        });
        sceneView.graphics.add(graphic);
      }
    });
  }

  // start the tool to create the line of sight analysis
  viewModel.start();
  // resume the analysis
  watchUtils.whenEqualOnce(viewModel, "state", "creating", () => {
    viewModel.stop();
  });

  /**
     * Layer List
     */
   sceneView.when(function() {
    var layerList = new LayerList({
      view: sceneView
    });

    // Add widget to the top right corner of the view
    sceneView.ui.add(layerList, "bottom-right");
  });
}

export default function initialize (sceneDiv) {
  let view = initScene(sceneDiv);
  initWidgets(view);
}