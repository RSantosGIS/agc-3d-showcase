import WebScene from '@arcgis/core/WebScene';
import SceneView from '@arcgis/core/views/SceneView';
import DirectLineMeasurement3D from '@arcgis/core/widgets/DirectLineMeasurement3D';
import AreaMeasurement3D from '@arcgis/core/widgets/AreaMeasurement3D';
//import config from 'AgcShowcaseConfig';

const initScene = (sceneDiv) => {
  // load a webscene
  const webscene = new WebScene({
    portalItem: {
      id: "b6c889ff1f684cd7a65301984b80b93d"
    }
  });

  // create the scene view
  const view = new SceneView({
    container: sceneDiv,
    map: webscene
  });
  return view;
}

const initWidgets = (sceneView, widgetRefs) => {
  // add the toolbar for the measurement widgets
  var activeWidget;
  sceneView.ui.add(widgetRefs.topBarRef, "top-right");

  widgetRefs.distanceBtnRef.addEventListener("click", (event) => {
    setActiveWidget(null);
    if (!event.target.classList.contains("active")) {
      setActiveWidget("distance");
    } else {
      setActiveButton(null);
    }
  });

  widgetRefs.areaBtnRef.addEventListener("click", (event) => {
    setActiveWidget(null);
    if (!event.target.classList.contains("active")) {
      setActiveWidget("area");
    } else {
      setActiveButton(null);
    }
  });

  function setActiveWidget(type) {
    switch (type) {
      case "distance":
        activeWidget = new DirectLineMeasurement3D({
          view: sceneView
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        sceneView.ui.add(activeWidget, "top-right");
        setActiveButton(widgetRefs.distanceBtnRef);
        break;
      case "area":
        activeWidget = new AreaMeasurement3D({
          view: sceneView
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.start();

        sceneView.ui.add(activeWidget, "top-right");
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