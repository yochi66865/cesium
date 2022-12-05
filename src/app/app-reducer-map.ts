import { cesiumReducer, CesiumState } from './cesium-state/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  cesiumReducer: CesiumState;
}

export const reducers: ActionReducerMap<IAppState> = {
  cesiumReducer,
};
