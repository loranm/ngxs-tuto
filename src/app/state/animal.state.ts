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
  addAnimal(ctx: StateContext<ZooStateModel>, payload: { name: string }) {
    const state = ctx.getState();
    ctx.setState({ ...state, animals: [...state.animals, payload.name] });
  }
}
