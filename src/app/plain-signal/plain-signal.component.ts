import { Component, computed, effect, signal } from '@angular/core';
import { sharedSignal } from '../../shared/shared-signal';

@Component({
  selector: 'app-plain-signal',
  standalone: true,
  imports: [],
  templateUrl: './plain-signal.component.html',
  styleUrl: './plain-signal.component.scss'
})

export class PlainSignalComponent {
  counter = signal(0);
  multiplier: number = 0;

  constructor() {
    console.log(`counter value: ${this.counter()}`)
  }

  derivedCounter = computed(() => {
    return this.counter() * 10;
  });

  // This is how we can read the value of a signal from a computed signal without creating a dependency
  // Notice that this untracked feature is an advanced feature that should be rarely needed, if ever.
  // derivedCounter = computed(() => {
  //   return untracked(this.counter) * 10;
  // })


  // Remember, Angular will only consider that one signal depends on another if it notices that a signal is
  // needed to calculate the value of another signal.
  // This means that we need to be careful with introducing conditional logic inside the computed function.
  // Here is an example of how things could easily go wrong:
  // derivedCounter = computed(() => {
  //   if (this.multiplier < 10) {
  //     return 0
  //   }
  //   else {
  //     return this.counter() * this.multiplier;
  //   }
  // })

  // This example would work with conditional logic
  // derivedCounter = computed(() => {
  //  this.multiplier = 10;
  //   if (this.counter() == 0) {
  //     return 0
  //   }
  //   else {
  //     return this.counter() * this.multiplier;
  //   }
  // })

  increment() {
    console.log(`Updating counter...`)
    // this.counter.set(this.counter() + 1);
    this.counter.update(counter => counter + 1);
  }

  // Objects and arrays with signals
  // In the code below, we are updating values of the object
  // properties and elements in the array directly.
  /// Signals are not meant to be used this way.
  // By doing so, we prevent that all the derived signals from
  // updating themselves and have those changes reflected on the page.
  list = signal([
    "Hello",
    "World"
  ]);

  object = signal({
    id: 1,
    title: "Angular For Beginners"
  });

  updateObjectAndArray() {
    this.list().push("Again");
    this.object().title = "overwriting title";
  }

  effectFunction() {
    // Detecting signal changes with the effect() API
    // This is used when we want to detect that a value has changed for some
    // other reason than a depended signal is changed.
    //The effect will be re-run whenever any
    // of the signals that it uses changes value.
    effect(() => {
      // We just have to use the source signals
      // somewhere inside this effect
      const currentCount = this.counter();
      const derivedCounter = this.derivedCounter();
      console.log(`current values: ${currentCount} ${derivedCounter}`);
    });
  }

  /* Writing to signals in a computed() or an effect() */
  // By default, Angular does not allow a signal value to be changed from inside an effect function.
  // As in this example:
  // constructor() {
  //   effect(() => {
  //     this.counter.set(1);
  //   });
  // }
  // In the particular case of this example, this would even create an infinite loop and break the whole application!
  effectDemo() {
    effect(() => {
      this.counter.set(1);
    },
      {
        // Pass the option allowSignalWrites to effect to allow that setting signals are ok:
        allowSignalWrites: true
      }
    );
  }

  // In Angular, effects are cleaned up automatically when the component they are in is destroyed to avoid memory leaks.
  // This is how we can destroy effects manually even it this will be necessary on rare occasions.
  destroyEffect() {
    const effectRef = effect(() => {
      console.log(`current value: ${this.counter()}`);
    },
      {
        // This disables the default cleanup behavior
        manualCleanup: true
      });
    //The effectRef.destroy() method will destroy the effect, removing it from any upcoming scheduled
    // executions, and cleaning up any references to variables outside the scope of the effect function,
    // potentially preventing memory leaks.
    effectRef.destroy();
  }

  // Performing cleanup operations when an effect is destroyed
  // Sometimes just removing the effect function from memory is not enough for a proper cleanup.
  // On some occasions, we might want to perform some sort of cleanup operation like closing a network connection or otherwise releasing some resources when an effect gets destroyed.
  // To support these use cases, we can pass to an effect a onCleanup callback function:
  onCleanUpDemo() {
    effect((onCleanup) => {
      console.log(`current value: ${this.counter()}`);
      onCleanup(() => {
        console.log("Perform cleanup action here");
      });
    });
  }
  //   This function will be called when the cleanup takes place.
  // Inside the onCleanup function, we can do any cleanup we want, such for example:
  // unsubscribing from an observable
  // closing a network or database connection
  // clearing setTimeout or setInterval
  // etc.

  // Read-only signals
  // We have already been using read-only signals already, even without noticing.
  // These are signals whose value can't be mutated. These are like the equivalent of const in the
  // JavaScript language.
  // Readonly signals can be accessed to read their value but can't be changed using the set or update
  // methods. Read-only signals do not have any built -in mechanism that would prevent deep mutation of
  // their value.
  // Read - only signals can be created from: computed() and signal.asReadonly()
  // Let's try to change the value of a derived signal, just to see what happens:
  readOnlySignalDemo() {
    this.counter.set(5); // this works as expected
    // this.derivedCounter.set(50); // this throws a compilation error
  }

  readOnlySignalDemoWithAsReadonly() {
    const readOnlyCounter = this.counter.asReadonly();
    // readOnlyCounter.set(5); // this throws a compilation error
  }
  // Notice that the other way around is not possible: you don't have an API to create a writeable signal
  // from a read - only signal.
  // To do that, you would have to create a new signal with the current value of the read - only signal.


  // Using a signal in multiple components (See description in the next component "HundredIncrComponent")
  useSharedSignal = () => {
    const sharedSignalLocalVar = sharedSignal;
    sharedSignalLocalVar.update((value) => value + 100);
  }



}
