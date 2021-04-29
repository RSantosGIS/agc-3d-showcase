import React from 'react'
import MapViewer from './MapViewer';
import SceneViewer from './SceneViewer';

export default function LinkedMapsContainer() {
  return (
    <div>
      <MapViewer></MapViewer>
      <SceneViewer></SceneViewer>
    </div>
  )
}
