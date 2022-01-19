import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { filter, Observable, tap } from 'rxjs';
import { AddAnimal } from './state/animal.actions';
import { ZooStateModel } from './state/animal.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  animals$: Observable<any> = this.store
    .select((state): any => state.zoo.animals)
    .pipe(filter((animals) => Boolean(animals.length)));

  get animalName(): string {
    return this.form.get('name')?.value;
  }

  addAnimal(name: string): void {
    this.store.dispatch(new AddAnimal(name));
  }

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.addAnimal(this.animalName);
    this.form.reset();
  }
}
