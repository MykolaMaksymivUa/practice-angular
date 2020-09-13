export function AutoUnsubscribe(subName: string = 'sub') {
  return (constructor: any) => {
    const originalDestroyHook = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      const sub = this[subName];

      if (sub) {
        sub.unsubscribe();
      }

      if (originalDestroyHook && (typeof originalDestroyHook === 'function')) {
        originalDestroyHook.apply(this, arguments);
      }

      console.log(`Unsubscribe decorator is called. Subscription name is: ${subName}.`);
    };
  };
}
