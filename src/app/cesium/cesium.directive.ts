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
      infoBox: true,
      shouldAnimate: true,
      baseLayerPicker: true,
    });
    const buildingTileset = viewer.scene.primitives.add(
      Cesium.createOsmBuildings()
    );

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(35.08182, 31.41173, 300000),
    });
  }
}
