!(function () {
  'use strict';
  navigator.serviceWorker.getRegistration().then(registration => registration.unregister().then(function (boolean) {
    console.log(
      (boolean ? 'Successfully unregistered' : 'Failed to unregister'), 'ServiceWorkerRegistration\n' +
      (registration.installing ? '  .installing.scriptURL = ' + registration.installing.scriptURL + '\n' : '') +
      (registration.waiting ? '  .waiting.scriptURL = ' + registration.waiting.scriptURL + '\n' : '') +
      (registration.active ? '  .active.scriptURL = ' + registration.active.scriptURL + '\n' : '') +
      '  .scope: ' + registration.scope + '\n'
    );
    window.location.reload();
  }));
})();
