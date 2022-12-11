import { TestBed } from '@angular/core/testing';
import { Cartesian3, Cartesian4 } from 'cesium';
import * as Cesium from 'cesium';
import { CesiumService } from './cesium-service.service';

describe('CesiumServiceService', () => {
  let service: CesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CesiumService);
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

  it('should initial cesium', function () {
    console.log('DEFAULT_VIEW_RECTANGLE', Cesium.Camera.DEFAULT_VIEW_RECTANGLE);
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
