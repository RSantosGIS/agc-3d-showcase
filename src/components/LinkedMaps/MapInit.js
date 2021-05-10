import MapView from "@arcgis/core/views/MapView";
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Legend from '@arcgis/core/widgets/Legend';
import Map from '@arcgis/core/Map';

const initRenderer = () => {
  var renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "point-3d", // autocasts as new PointSymbol3D()
      symbolLayers: [
        {
          type: "object", // autocasts as new ObjectSymbol3DLayer()
          resource: {
            primitive: "cone"
          },
          width: 50000 // width of the symbol in meters
        }
      ]
    },
    label: "hurricane location",
    visualVariables: [
      {
        type: "color",
        field: "PRESSURE",
        stops: [
          {
            value: 950,
            color: "red"
          },
          {
            value: 1020,
            color: "blue"
          }
        ]
      },
      {
        type: "size",
        field: "WINDSPEED",
        stops: [
          {
            value: 20,
            size: 60000
          },
          {
            value: 150,
            size: 500000
          }
        ],
        axis: "height"
      },
      {
        type: "size",
        axis: "width-and-depth",
        useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
      }
    ]
  };
  return renderer;
}

const initPopups = () => {
  const template = {
    // autocasts as new PopupTemplate()
    title: "{EVENTID} on {DAY}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "PRESSURE",
            label: "Pressure"
          },
          {
            fieldName: "WINDSPEED",
            label: "Windspeed"
          },
        ]
      }
    ]
  };
  return template;
};

const initMapView = (mapDiv, layers) =>{
  //Maps
  var cartesianMap = new Map({
    basemap: "hybrid",
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

const initSceneView = (sceneDiv, layers) => {
  var sceneMap = new Map({
    basemap: "hybrid",
    ground: 'world-elevation',
    layers: layers
  });
  const sceneView = new SceneView({
    container: sceneDiv,
    map: sceneMap,
    environment: {
      lighting: {
        date: new Date("July 15, 2015 8:00:00 PDT"),
        directShadowsEnabled: true
      },
      atmosphere: {
        quality: "high"
      }
    }
  });
  return sceneView;
};

const initWidgets = (mapView, sceneView) => {
  var mapLegend = new Legend({
    view: mapView
  });
  mapView.ui.add(mapLegend, "bottom-left");
  var sceneLegend = new Legend({
    view: sceneView
  });

  sceneView.ui.add(sceneLegend, "bottom-left");
};

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
  var lyonSceneLayer = new SceneLayer({
    portalItem: {
      id: "b66b02861afa4e8dbf9655d05bc89afc"
    },
    elevationInfo: {
      mode: "absolute-height",
      offset: 6
    }
  });
  var hurricaneLayer2d = new FeatureLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0",
    popupTemplate: template
  });
  var hurricaneLayer3d = new FeatureLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0",
    renderer: renderer,
    popupTemplate: template
  });

  //Views
  let mapView = initMapView(mapDiv, [hurricaneLayer2d]);
  let sceneView = initSceneView(sceneDiv, [hurricaneLayer3d, lyonSceneLayer]);

  //Widgets
  initWidgets(mapView, sceneView);
  //Event handling
  initEventHandling(mapView, sceneView);



}

