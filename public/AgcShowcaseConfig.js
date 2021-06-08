/* eslint-disable no-unused-vars */
var AgcShowcaseConfig = {
  rootPath : '/agc-3d-showcase',
  bannerText: 'AGC 3D Showcase',
  tabDefs: {
    tabIndexes: ['/home', '/line-of-sight', '/measurement'],
    tabTitles: ["Linked Map/Scene", "Line of Sight", "Measurement"],
    linkedMapSettings : {
      renderer: {
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
      },
      demoFeaturePopuptemplate : {
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
      },
      mapSettings : {
        basemap: "hybrid"
      },
      sceneSettings: {
        basemap: "hybrid",
        ground: "world-elevation"
      },
      sceneViewSettings: {
        environment: {
          lighting: {
            date: new Date("July 15, 2015 8:00:00 PDT"),
            directShadowsEnabled: true
          },
          atmosphere: {
            quality: "high"
          }
        }
      },
      legendSettings: {
        uiLocation: "bottom-left"
      },
      demoSceneLayerSettings: {
        portalItem: {
          id: "b66b02861afa4e8dbf9655d05bc89afc"
        },
        elevationInfo: {
          mode: "absolute-height",
          offset: 6
        }
      },
      demoFeatureLayerSettings: {
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0"
      }
    },
    losSettings: {
      sceneSettings: {
        portalItemId: '82127fea11d6439abba3318cb93252f7'
      },
      losWidgetSettings: {
        uiLocation: 'top-right'
      }
    },
    measurementSettings: {
      portalItemId: 'b6c889ff1f684cd7a65301984b80b93d',
      widgetPosition: 'top-right'
    }
  }
}