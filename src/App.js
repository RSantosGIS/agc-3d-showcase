import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import SceneView from '@arcgis/core/views/SceneView';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Map from '@arcgis/core/Map';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Legend from '@arcgis/core/widgets/Legend';

import "./App.css"; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  starButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const mapDiv = useRef(null);
  const sceneDiv = useRef(null);
  const [navTabIndex, setNavTabIndex] = React.useState(0);
  
  useEffect(() => {
    //Renderer
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

    //Popups
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

    //Layers
    const lyonSceneLayer = new SceneLayer({
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


    //Maps
    var cartesianMap = new Map({
      basemap: "hybrid",
      layers: [hurricaneLayer2d]
    });
    var sceneMap = new Map({
      basemap: "hybrid",
      ground: 'world-elevation',
      layers: [lyonSceneLayer, hurricaneLayer3d]
    });
    if (mapDiv.current && sceneDiv.current) {
      /**
       * Initialize application
       */

      const mapView = new MapView({
        container: mapDiv.current,
        map: cartesianMap,
        constraints: {
          // Disable zoom snapping to get the best synchronization
          snapToZoom: false
        }
      });
      const sceneView = new SceneView({
        container: sceneDiv.current,
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

      //Widgets
      var mapLegend = new Legend({
        view: mapView
      });
      mapView.ui.add(mapLegend, "bottom-left");
      var sceneLegend = new Legend({
        view: sceneView
      });

      sceneView.ui.add(sceneLegend, "bottom-left");

      console.log(mapLegend.container);


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
  }, []);

  const handleChange = (event, newIndex) => {
    setNavTabIndex(newIndex);
    //TODO: Link this to a browser router and use it to drive page navigation
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return <>
  <Grid container>
    <Grid item xs={12}>
    <div className = {classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.starButton} color='inherit' aria-label='menu'>
            <StarIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
              AGC 3D Showcase
          </Typography>
          <Tabs value={navTabIndex} onChange={handleChange} arial-label='nav tabs'>
            <Tab label="Linked Map/Scene" {...a11yProps(0)}/>
            <Tab label="Future Demo" {...a11yProps(1)}/>
            <Tab label="Future Demo" {...a11yProps(2)}/>
          </Tabs>
        </Toolbar>
      </AppBar>    
    </div>
    </Grid>
  </Grid>
  
  <Grid className="contentRoot" container>
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
