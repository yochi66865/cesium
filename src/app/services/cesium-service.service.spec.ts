import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cartesian3, Cartesian4, IonImageryProvider } from 'cesium';
import * as Cesium from 'cesium';
import { CesiumService } from './cesium-service.service';
import { ElementRef } from '@angular/core';
import { CesiumComponent } from '../cesium/cesium.component';

describe('CesiumServiceService', () => {
  let service: CesiumService;
  let component: CesiumComponent;
  let fixture: ComponentFixture<CesiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CesiumComponent],
    }).compileComponents();
    (window as any)['CESIUM_BASE_URL'] = '/assets/cesium/';

    service = TestBed.inject(CesiumService);
    fixture = TestBed.createComponent(CesiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Core/Cartesian3', function () {
    it('construct with default values', function () {
      const cartesian = new Cartesian4(380.0, 380.0, 38.0, 38.0);
      expect(cartesian.x).toEqual(380.0);
      expect(cartesian.y).toEqual(380.0);
      expect(cartesian.z).toEqual(38.0);
      expect(cartesian.w).toEqual(38.0);
    });
  });

  fit('should initial cesium', function () {
    const compiled = fixture.nativeElement as HTMLElement;
    const nativeElement = compiled.querySelector('.cesium-map');
    const testElement: ElementRef = { nativeElement };
    const insantiateSpy = spyOn(service, 'initialCesium');
    service.initialCesium(testElement);
    expect(service.viewer).toBeTruthy();

    expect(
      service.viewer.imageryLayers.get(0).imageryProvider.requestImage.prototype
    ).toBeTruthy();

    // this.viewer = new Cesium.Viewer(el.nativeElement, {
    //   imageryProvider: Cesium.createWorldImagery({
    //     style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
    //   }),
    //   infoBox: false,
    //   shouldAnimate: true,
    //   baseLayerPicker: true,
    //   selectionIndicator: false,
    // });

    //     x: 20037508.342789244 , y: 20037508.342789244
    // _rectangleSouthwestInMeters
    // :
    // Cartesian2
    // x:  -20037508.342789244,  y: -20037508.342789244
  });
});

/*

    // east:  -1.2217304763960306
    // north:  1.5707963267948966
    // south: -0.3490658503988659
    // west:  -1.6580627893946132
var extent = Cesium.Rectangle.fromDegrees(380.0, 380.0, 38.0, 38.0);

    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

    this.viewer = new Cesium.Viewer(el.nativeElement, {
      sceneMode: Cesium.SceneMode.SCENE3D,
      imageryProvider: Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
      }),
      infoBox: false,
      shouldAnimate: true,
      baseLayerPicker: true,
      selectionIndicator: false,
    });

    this.scene = this.viewer.scene;

    if (!this.scene.pickPositionSupported) {
      window.alert('This browser does not support pickPosition.');
    }
*/
