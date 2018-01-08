// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  medicines_backend: {
    url: "http://lapr5-g6618-medicines-management.azurewebsites.net"
  },
  receipts_frontend: {
    url: "http://lapr5-g6618-receipts-management.azurewebsites.net",
    client_id: 'JlBREWOiSAE87o0MZjymMkH8z5wPX7QW',
    client_secret: 'xVeQAFK7NeZZXSJ7ZQeA2H6ouILGkGIyxBNKVPo-8W5tzDC-0o_vIwF96veW9V7b'
  }
};
