import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddAnimal } from './state/animal.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngxs-tuto';

  form!: FormGroup;

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
    this.form = new FormGroup({ name: new FormControl('') });
  }

  submit() {
    this.addAnimal(this.animalName);
  }
}
