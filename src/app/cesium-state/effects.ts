import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CesiumService } from '../services/cesium-service.service';
import {
  addEntityToMap,
  removeEntityFromMap,
  toggleEntityToMap,
} from './actions';
import { getDictionaryEntitiesOnMap } from './reducer';

@Injectable()
export class CesiumEffects {
  constructor(
    private actions$: Actions,
    private cesiumService: CesiumService,
    private store: Store<any>
  ) {}

  toggleEntityToMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleEntityToMap),
      withLatestFrom(this.store.select(getDictionaryEntitiesOnMap)),
      map(([{ toggleEntity }, entities]) =>
        entities?.[toggleEntity.id ?? 0]
          ? removeEntityFromMap({ entityId: toggleEntity.id ?? '' })
          : addEntityToMap({ newEntity: toggleEntity })
      )
    )
  );

  addEntityToMap$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addEntityToMap),
        map(({ newEntity }) => this.cesiumService.addEntityToMap(newEntity))
      ),
    { dispatch: false }
  );

  removeEntityFromMap$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeEntityFromMap),
        map(({ entityId }) => this.cesiumService.removeEntityFromMap(entityId))
      ),
    { dispatch: false }
  );
}
