import { Directive, ElementRef, OnInit } from '@angular/core';
import * as Cesium from 'cesium';

const CESIUM_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNDViODRjMi1jNDNmLTRiMjUtOWE3Ny01MTE1MGEzMTk2MjMiLCJpZCI6MTE2NDY2LCJpYXQiOjE2Njk3MjY3Mzh9.8gaTQPKhD9KvyBwPU0sM3zHrBBdYq9jHfdGlFN0Cpmw';
Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;

@Directive({
  selector: '[appCesium]',
})
export class CesiumDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const viewer = new Cesium.Viewer(this.el.nativeElement, {
      terrainProvider: Cesium.createWorldTerrain(),
    });
    //   const buildingTileset = viewer.scene.primitives.add(
    //     Cesium.createOsmBuildings()
    //   );

    //   // {"DD":{"lat":31.41173,"lng":35.08182},
    //   viewer.camera.flyTo({
    //     destination: Cesium.Cartesian3.fromDegrees(35.08182, 31.41173),
    //     orientation: {
    //       heading: Cesium.Math.toRadians(0.0),
    //       pitch: Cesium.Math.toRadians(-15.0),
    //     },
    //   });
  }
}
