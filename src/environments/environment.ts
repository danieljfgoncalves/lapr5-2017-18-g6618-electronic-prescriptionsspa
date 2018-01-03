// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  medicines_backend: {
    url: "http://arqsi2017-medicines-backend-api.azurewebsites.net"
  },
  receipts_frontend: {
    url: "http://arqsi2017-receipts-frontend-api.azurewebsites.net"
  }
};
