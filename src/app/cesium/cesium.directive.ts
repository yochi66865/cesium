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
      infoBox: false,
      shouldAnimate: true,
      baseLayerPicker: true,
      selectionIndicator: false,
    });

    const scene = viewer.scene;

    if (!scene.pickPositionSupported) {
      window.alert('This browser does not support pickPosition.');
    }

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(35.08182, 31.41173, 300000),
    });

    const entity = viewer.entities.add({
      label: {
        show: false,
        showBackground: true,
        font: '14px monospace',
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(15, 0),
      },
    });

    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (click: any) {
      const cartesian = viewer.camera.pickEllipsoid(
        click.position,
        scene.globe.ellipsoid
      );
      if (cartesian) {
        console.log('cartesian', cartesian);

        // const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        // const longitudeString = Cesium.Math.toDegrees(
        //   cartographic.longitude
        // ).toFixed(2);
        // const latitudeString = Cesium.Math.toDegrees(
        //   cartographic.latitude
        // ).toFixed(2);

        // entity.position?.getValue(new Cesium.JulianDate(), cartesian);
        // entity?.label?.show?.getValue(new Cesium.JulianDate(), true);
        // entity?.label?.text?.getValue(
        //   new Cesium.JulianDate(),
        //   `Lon: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
        //     `\nLat: ${`   ${latitudeString}`.slice(-7)}\u00B0`
        // );
      } else {
        // entity?.label?.show?.getValue(new Cesium.JulianDate(), false);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
}
