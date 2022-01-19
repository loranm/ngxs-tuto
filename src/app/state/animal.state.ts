import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

export interface ZooStateModel {
  animals: string[];
  feed: boolean;
}

const ZOO_STATE_TOKEN = new StateToken<ZooStateModel>('zoo');

@State({
  name: ZOO_STATE_TOKEN,
  defaults: {
    animals: [],
    feed: false,
  },
})
@Injectable()
export class ZooState {
  @Action(AddAnimal)
  addAnimal(ctx: StateContext<ZooStateModel>, action: { name: string }) {
    console.log(action);
    const state = ctx.getState();
    ctx.patchState({ animals: [...state.animals, action.name], feed: true });

    console.log(state);
  }
}
