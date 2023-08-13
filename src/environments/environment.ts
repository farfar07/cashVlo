// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  payment: {
    api: "https://api-link.cashlez.com/",
  },
  apiv4: {
    apiAddress: "103.145.175.5",
    apiPort: "2051",
    // apiAddress: "168.168.10.10",
    // apiPort: "5323",
    apiKey: "xWBDj5+ZCMska8BDY8sPYHh1sgOCMPlsWSzrD8SRcVI=",
    app_update: "http://103.145.175.10:80/easypost/ftp/data/easypost_apk/",
  },
  FTP: {
    ftp_host: "103.145.175.10",
    ftp_user: "easypost",
    ftp_password: "r4h4rj4",
  },
  WhaCenter: {
    key: "c62968441534b43af749a735e8f2bd4c",
  },
  // apiDevel: {
  //   // api devel
  //   name: "API DEVEL",
  //   apiAddress: "192.168.10.132",
  //   apiPort: "3000",
  //   username: "superadmin",
  //   password: "@bcd12345",
  // },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
