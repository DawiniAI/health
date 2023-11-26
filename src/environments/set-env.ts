let production = process.env['isProduction']

console.log('isProduction', production);
console.log('env', process.env);

const fs = require('fs');
const colors = require('colors/safe');
const path = require('path');
if (production) {
  require('dotenv').config({
    path: path.resolve(__dirname, '../../.env.prod'),
  }); // Adjust the path as needed
} else {
  require('dotenv').config({
    path: path.resolve(__dirname, '../../.env.local'),
  }); // Adjust the path as needed
}

const appVersion = require('../../package.json').version; // Adjust the path as needed

const setEnv = () => {
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Configure Angular `environment.prod.ts` file path
  const targetPathProd = './src/environments/environment.prod.ts';

  console.log('process.env', process.env['projectId']);

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    firebase: {
      projectId: '${process.env['projectId']}',
      appId: '${process.env['appId']}',
      databaseURL: '${process.env['databaseURL']}',
      storageBucket: '${process.env['storageBucket']}',
      locationId: '${process.env['locationId']}',
      apiKey: '${process.env['apiKey']}',
      authDomain: '${process.env['authDomain']}',
      messagingSenderId: '${process.env['messagingSenderId']}',
      measurementId: '${process.env['measurementId']}',
    },
    clientId: '${process.env['clientId']}',
    production: false,
    appVersion: '${appVersion}',
  };
  `;

  // `environment.prod.ts` file structure
  const envConfigFileProd = `export const environment = {
    firebase: {
      projectId: '${process.env['projectId']}',
      appId: '${process.env['appId']}',
      databaseURL: '${process.env['databaseURL']}',
      storageBucket: '${process.env['storageBucket']}',
      locationId: '${process.env['locationId']}',
      apiKey: '${process.env['apiKey']}',
      authDomain: '${process.env['authDomain']}',
      messagingSenderId: '${process.env['messagingSenderId']}',
      measurementId: '${process.env['measurementId']}',
    },
    clientId: '${process.env['clientId']}',
    production: true,
    appVersion: '${appVersion}',
  };
  `;

  console.log(colors.magenta('Generating Angular environment.ts file...'));

  fs.writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(colors.green(`Environment file generated at ${targetPath}`));
    }
  });

  console.log(colors.magenta('Generating Angular environment.prod.ts file...'));

  fs.writeFile(targetPathProd, envConfigFileProd, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.green(`Environment file generated at ${targetPathProd}`)
      );
    }
  });
};

setEnv();
