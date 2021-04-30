import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';

// var map = new Map({
//   basemap: "satellite"
// });

// // var sceneView = new SceneView({
// //   map: map
// // });

// var mapView = new MapView({
//   map: map,
//   constraints: {
//     // Disable zoom snapping to get the best synchronization
//     snapToZoom: false
//   }
// });

// const views = [sceneView, mapView];
// let active;

// const sync = (source) => {
//   if (!active || !active.viewpoint || active !== source) {
//     return;
//   }

//   for (const view of views) {
//     if (view !== active) {
//       view.viewpoint = active.viewpoint;
//     }
//   }
// };

export const initialize = (sceneContainer, mapContainer) => {
  // debugger;
  // mapView.container = mapContainer;
  // mapView.when().then(()=>{
  //   console.log('scene loaded');
  // });
  // //mapView.container = mapContainer;

  // Promise.all([sceneView.when(), mapView.when()]).then(()=> {
  //   //all elements ready
  //   sceneView.watch(["interacting", "animation"], () => {
  //     active = sceneView;
  //     sync(active);
  //   });
  
  //   sceneView.watch("viewpoint", () => sync(sceneView));

  //   mapView.watch(["interacting", "animation"], () => {
  //     active = mapView;
  //     sync(active);
  //   });
  
  //   mapView.watch("viewpoint", () => sync(mapView));
  // })
}

