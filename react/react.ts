/**
 * Type for the closure's value equality predicate.
 *
 * @typeParam T - Type of the values being compared for
 *              equality.
 *
 * @remarks
 * Conceptually this function should be equivalent
 * to: `lhs === rhs`
 *
 * @param lhs   - left hand side value
 * @param rhs   - right hand side value
 * @returns     - `true` if values are considered
 *                equal; `false` otherwise.
 */
type EqualFn<T> = (lhs: T, rhs: T) => boolean;
type GetterFn<T> = () => T;
type SetterFn<T> = (value: T) => void;
type UnsubscribeFn = () => void;
type UpdateFn<T> = (value?: T) => T;

type InputPair<T> = [GetterFn<T>, SetterFn<T>];

type Options = {
  name: string; // for debugging
};

type ObserverR = {
  name?: string;
};

type ObserverV<T> = {
  value?: T;
  updateFn: UpdateFn<T>;
};

type Observer<T> = ObserverR & ObserverV<T>;

type SubjectR = {
  name?: string;
  observer: ObserverR | undefined;
};

type SubjectV<T> = {
  value: T;
  equalFn?: EqualFn<T>;
};

type Subject<T> = SubjectR & SubjectV<T>;

// module Context value
let activeObserver: Observer<any> | undefined = undefined;
let callbackObservers: Observer<any>[] = [];

/**
 * Creates an input closure. The value is accessed
 * via the accessor and changed via the
 * mutator returned as part an `InputPair<T>`.
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the return
 *                value of the accessor and the type
 *                of the mutator's single argument.
 *
 * @param value   - Input closure's initial value.
 * @param equal   - By default the current and previous
 *                values are not compared so invoking
 *                the mutator with identical values
 *                will trigger updates on any
 *                subscribers. When `true` is
 *                specified the
 *                {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                is used to compare values and
 *                mutations with unchanging values
 *                **are** suppressed.
 *                When `T` is a structural type
 *                it is necessary to provide a
 *                `(a: T, b: T) => boolean` comparison
 *                predicate instead.
 * @param options - Holder object for relevant options.
 *                Assigning a `name` to a subject can
 *                be useful during debugging.
 * @returns       - An `InputPair<T>`. The 1st
 *                element is the accessor (getter
 *                function), the 2nd element is
 *                the mutator (setter function).
 */
function createInput<T>(
  value: T,
  _equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): InputPair<T> {
  activeObserver = undefined;
  callbackObservers = [];

  const s: Subject<T> = {
    name: options?.name,
    observer: undefined,
    value,
    equalFn: undefined,
  };

  const read: GetterFn<T> = () => {
    return s.value;
  };

  const write: SetterFn<T> = (value) => {
    let changed = s.value !== value;

    let before = activeObserver && activeObserver.updateFn();
    s.value = value;
    let after = activeObserver && activeObserver.updateFn();

    if (changed && before !== after && callbackObservers) {
      callbackObservers.forEach((co) => {
        if (co.updateFn) co.updateFn();
      });
    }
  };

  return [read, write];
}

/**
 * Creates a computed (derived) closure with the
 * supplied function which computes the current value
 * of the closure.
 *
 * @privateRemarks
 * `Observer<T>` may be good enough to get through
 * the enabled test case but more is needed to
 * get further ...
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the value
 *                returned by the update function and
 *                of the value
 *                accepted by the function.
 *
 * @param updateFn - Update function. This function
 *                 references one or more accessors of
 *                 other subjects. It **should not**
 *                 perform side effects. It is expected
 *                 to return a value which will be the
 *                 value of the closure until the next
 *                 update. The closure's value is
 *                 supplied to this update function
 *                 on the next update.
 * @param value    - Initial value that is passed to
 *                 `updateFn` when it executes for the
 *                 first time.
 * @param equal    - By default the current and previous
 *                 values are not compared so updates
 *                 will be triggered even if the value
 *                 doesn't _change_. When `true` is
 *                 specified the
 *                 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                 is used to compare values and updates
 *                 with identical values **are**
 *                 suppressed. When `T` is a structural
 *                 type it is necessary to provide a
 *                 `(a: T, b: T) => boolean` comparison
 *                 predicate instead.
 * @param options  - Holder object for relevant options.
 *                 Assigning a `name` to a subject can
 *                 be useful during debugging.
 * @returns        - The accessor to the closure's
 *                 value (getter function). Retrieves
 *                 the closure's current value. Used by
 *                 observers (or more accurately their
 *                 update function) to obtain the
 *                 value (and to subscribe for
 *                 updates).
 */
function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  _equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): GetterFn<T> {
  activeObserver = {
    name: options?.name,
    value,
    updateFn,
  };
  return (): T => updateFn(value);
}

/**
 * Creates a callback closure with the supplied
 * function which is expected to perform side effects.
 *
 * @privateRemarks
 * `observer` isn't mean't to be an empty object literal.
 * Replace it with something more appropriate to its
 * purpose.
 *
 * @typeParam T    - Type of the closure's value.
 *                 By extension the type of the value
 *                 returned by the callback function
 *                 and of the value accepted by the
 *                 function.
 *
 * @param updateFn - Callback function. This function
 *                 references one or more accessors of
 *                 subjects. It may perform side effects.
 *                 It will also be passed the
 *                 value that it returned the last time it
 *                 was invoked.
 * @param value    - Initial value that is passed to
 *                 `updateFn` when it executes for
 *                  the first time.
 * @returns        - The `unsubscribe` function. Once
 *                 invoked the callback closure will
 *                 stop receiving updates from the
 *                 subjects it subscribed to.
 */
function createCallback<T>(_updateFn: UpdateFn<T>, _value?: T): UnsubscribeFn {
  const callback: Observer<T> = {
    name: Math.floor(Math.random() * 1000).toString(),
    value: _value,
    updateFn: _updateFn,
  };
  callbackObservers.push(callback);
  return ((callback: Observer<T> | undefined) => (): void => {
    if (!callback) return;
    callbackObservers = callbackObservers.filter((co) => co.name != callback?.name);
    callback = undefined;
  })(callback);
}

export { createInput, createComputed, createCallback };