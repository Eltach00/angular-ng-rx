import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from 'src/app/store/counter.action';

@Component({
  selector: 'app-state-test-page',
  templateUrl: './state-test-page.component.html',
  styleUrls: ['./state-test-page.component.scss'],
})
export class StateTestPageComponent {
  count$: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = this.store.select(`count`);
  }

  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }
}
