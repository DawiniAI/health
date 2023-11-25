// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: process.env['projectId'],
    appId: process.env['appId'],
    databaseURL: process.env['databaseURL'],
    storageBucket: process.env['storageBucket'],
    locationId: process.env['locationId'],
    apiKey: process.env['apiKey'],
    authDomain: process.env['authDomain'],
    messagingSenderId: process.env['messagingSenderId'],
    measurementId: process.env['measurementId'],
  },
  clientId: process.env['clientId'],
  production: false,
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
