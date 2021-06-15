import WebScene from '@arcgis/core/WebScene';
import SceneView from '@arcgis/core/views/SceneView';
import DirectLineMeasurement3D from '@arcgis/core/widgets/DirectLineMeasurement3D';
import AreaMeasurement3D from '@arcgis/core/widgets/AreaMeasurement3D';
import config from 'AgcShowcaseConfig';

/**
 * initializes the scene, given an html ref to place it in
 * @param {*} sceneDiv 
 * @returns an esri sceneView
 */
const initScene = (sceneDiv) => {
  // load a webscene
  const webscene = new WebScene({
    portalItem: {
      id: config.tabDefs.measurementSettings.portalItemId
    }
  });

  // create the scene view
  const view = new SceneView({
    container: sceneDiv,
    map: webscene
  });
  return view;
}

/**
 * Initializes the measurement and area widgets, given a sceneview they act on and refs to the widget html containers
 * @param {} sceneView 
 * @param {*} widgetRefs 
 */
const initWidgets = (sceneView, widgetRefs) => {
  // add the toolbar for the measurement widgets
  var activeWidget;
  sceneView.ui.add(widgetRefs.topBarRef, config.tabDefs.measurementSettings.widgetPosition);

  //event handler for when the distance button is clicked - toggles activity
  widgetRefs.distanceBtnRef.addEventListener("click", (event) => {
    setActiveWidget(null);
    if (!event.target.classList.contains("active")) {
      setActiveWidget("distance");
    } else {
      setActiveButton(null);
    }
  });

  //event handler for when the area button is clicked - toggles activity
  widgetRefs.areaBtnRef.addEventListener("click", (event) => {
    setActiveWidget(null);
    if (!event.target.classList.contains("active")) {
      setActiveWidget("area");
    } else {
      setActiveButton(null);
    }
  });

  /**
   * toggles the active widget based on the supplied widget type
   * @param {*} type 
   */
  function setActiveWidget(type) {
    switch (type) {
      case "distance":
        activeWidget = new DirectLineMeasurement3D({
          view: sceneView
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        sceneView.ui.add(activeWidget, config.tabDefs.measurementSettings.widgetPosition);
        setActiveButton(widgetRefs.distanceBtnRef);
        break;
      case "area":
        activeWidget = new AreaMeasurement3D({
          view: sceneView
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        sceneView.ui.add(activeWidget, config.tabDefs.measurementSettings.widgetPosition);
        setActiveButton(widgetRefs.areaBtnRef);
        break;
      case null:
      default:
        if (activeWidget) {
          sceneView.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  }

  //sets the active button for styling
  function setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    sceneView.focus();
    const elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }
}

export default function initialize (sceneDiv, widgetRefs) {
  let view = initScene(sceneDiv);
  initWidgets(view, widgetRefs);
}