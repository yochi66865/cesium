import { createAction, props } from '@ngrx/store';
import { Shop } from '../model/shop.model';

export const toggleEntityToMap = createAction(
  '[Cesium] Toggle Entity To Map',
  props<{ toggleEntity: Shop }>()
);

export const addEntityToMap = createAction(
  '[Cesium] Add Entity To Map',
  props<{ newEntity: Shop }>()
);

export const removeEntityFromMap = createAction(
  '[Cesium] Remove Entity From Map',
  props<{ entityId: string }>()
);
