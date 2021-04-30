import React, {useEffect, useRef} from 'react'



export default function LinkedMapsContainer() {
  const sceneRef=useRef();
  const mapRef = useRef();
  useEffect(() => {
    import ('./MapInit').then((maps) => {
      maps.initialize(sceneRef.current, mapRef.current);
    })
  }, [])
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* <MapViewer></MapViewer>
      <SceneViewer></SceneViewer> */}
      <div ref={sceneRef}></div>
      <div ref={mapRef}></div>
      
    </div>
  )
}
