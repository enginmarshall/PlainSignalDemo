import { Component } from '@angular/core';
import { sharedSignal } from '../../shared/shared-signal';

@Component({
  selector: 'app-hundred-incr',
  standalone: true,
  imports: [],
  templateUrl: './hundred-incr.component.html',
  styleUrl: './hundred-incr.component.scss'
})
export class HundredIncrComponent {
  count = sharedSignal;

  // Using a signal in multiple components
  // Let's now talk about some common patterns that you have available for using signals in your application.
  // If a signal is only used inside a component, then the best solution is to turn it into a member variable as we have been doing so far.
  // But what if the signal data is needed in several different places of the application ?
  // Well, nothing prevents us from creating a signal and using it in multiple components.
  // When the signal changes, all the components that use the signal will be updated.

  increment() {
    this.count.update((value) => value + 100);
  }

}
