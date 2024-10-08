import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals-and-onpush-components',
  standalone: true,
  imports: [],
  templateUrl: './signals-and-onpush-components.component.html',
  styleUrl: './signals-and-onpush-components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsAndOnpushComponentsComponent {
  // Signals and OnPush components
  // OnPush components are components that are only updated when their input properties change, or when Observables subscribed with the async pipe emit new values.
  // They are not updated when their input properties are mutated.
  // Now OnPush components are also integrated with signals.
  // When signals are used on a component, Angular marks that component as a dependency of the signal.When the signal changes, the component is re - rendered.
  // In the case of OnPush components, they will also be re - rendered when a signal attached to it is updated:
  count = signal(0);
  increment() {
    this.count.update((value) => value + 1);
  }

  // In this example, if we click on the Increment button, the component will be re - rendered, meaning that Signals are integrated directly with OnPush.
  // This means that we no longer need to inject ChangeDetectorRef and invoke
  // markForCheck, to update an OnPush component in this scenario.

}



// Consider the below example that does not use signals:


//   @Component({
//     selector: "app",
//     standalone: true,
//     template: ` Number: {{ num }} `,
//     changeDetection: ChangeDetectionStrategy.OnPush,
//   })
// class ExampleComponent {
//   num = 1;

//   private cdr = inject(ChangeDetectorRef);

//   ngOnInit() {
//     setInterval(() => {
//       this.num = this.num + 1;
//       this.cdr.markForCheck();
//     }, 1000);
//   }
// }
