import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Shop } from '../model/shop.model';
import { addEntityToMap, removeEntityFromMap } from './actions';

export interface CesiumState extends EntityState<Shop> {}

export const adapter: EntityAdapter<Shop> = createEntityAdapter<Shop>();

export const initialState: CesiumState = adapter.getInitialState();

export const cesiumReducer = createReducer(
  initialState,
  on(addEntityToMap, (state, { newEntity }) => {
    return adapter.addOne(newEntity, state);
  }),
  on(removeEntityFromMap, (state, { entityId }) => {
    return adapter.removeOne(entityId, state);
  })
);
export const selectCesiumState = createFeatureSelector<CesiumState>('cesium');

export const {
  selectIds: getIdsEntitiesOnMap,
  selectEntities: getDictionaryEntitiesOnMap,
  selectAll: getEntitiesOnMap,
  selectTotal: getTotalEntitiesOnMap,
} = adapter.getSelectors(selectCesiumState);
