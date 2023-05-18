# 1001 Albums You Must Hear Before You Die

The app that allows you to mark down the albums that you've listened to, from the book "1001 Albums You Must Hear Before You Die".

## Technologies

This is an NX monorepo with 3 different apps:

- Angular FE (app that makes a Rest API request to a NodeJS Express server, which has webscrapped the following webapp)
- Angular FE (page to be scrapped with the 1001 albums by a NodeJS Express server)
- NodeJS Express (BE app with node package Puppeteer that webscraps the previous app)

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

Run `npx nx run albums-fe:serve --port=4500`to run the 1001 albums app to be scrapped by the NodeJS Express app.

Run `nx serve express-be`to run NodeJS Express app that will scrape the http://localhost:4500 Angular app with the 1001 records.

Run `nx serve angular-fe`to run the 1001 albums app. This is the FE app where you'll be able to navigate and mark down the records that you've already listened to.

## Screenshots

![Screenshot 2023-05-18 at 18 43 47](https://github.com/paulo-bettencourt/1001-albums-nx-monorepo-angular-nodejs/assets/37920932/5f232a57-0a59-4ce5-93e8-0b94c6b09066)

![Screenshot 2023-05-18 at 18 43 54](https://github.com/paulo-bettencourt/1001-albums-nx-monorepo-angular-nodejs/assets/37920932/6cf14567-89c5-41ef-85d9-7c1d6a5cd9ad)

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
