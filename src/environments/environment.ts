// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  medicines_backend: {
    url: "https://lapr5-g6618-medicines-management.azurewebsites.net"
  },
  receipts_frontend: {
    url: "https://lapr5-g6618-receipts-management.azurewebsites.net",
    client_id: 'x2QUE1LixaXfsjsip8TZvWJacg61qcvy',
    client_secret: 'kENcRaE-32TGuSeYfb9sEsDHeDOc2KS_ymJ5Af8Br7smBsk4p6LWaSnQMmaLIlXd'
  }
};
