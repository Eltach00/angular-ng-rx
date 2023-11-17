import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  isLoaderActive = new BehaviorSubject(0);

  increaseLoader() {
    this.isLoaderActive.next(this.isLoaderActive.value + 1);
  }

  decreaseLoader() {
    this.isLoaderActive.next(
      this.isLoaderActive.value > 1 ? this.isLoaderActive.value - 1 : 0
    );
  }
}
