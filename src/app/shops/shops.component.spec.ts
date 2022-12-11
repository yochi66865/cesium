import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CesiumEffects } from '../cesium-state/effects';
import { cesiumReducer } from '../cesium-state/reducer';
import { ShopComponent } from './shop/shop.component';
import { ShopsComponent } from './shops.component';

describe('ShopsComponent', () => {
  let component: ShopsComponent;
  let fixture: ComponentFixture<ShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsComponent, ShopComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cesium', cesiumReducer),

        EffectsModule.forRoot([CesiumEffects]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
