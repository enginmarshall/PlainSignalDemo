import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  // this is the private writeable signal
  private counterSignal = signal(0);

  // this is the public read-only signal
  readonly counter = this.counterSignal.asReadonly();

  constructor() {
    // inject any dependencies you need here
  }

  // anyone needing to modify the signal
  // needs to do so in a controlled way
  incrementCounter() {
    this.counterSignal.update((val: number) => val + 1);
  }
}
