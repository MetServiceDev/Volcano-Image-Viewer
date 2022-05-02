# Volcano Image Viewer - Version 3
<img src="src/images/volcano.png" alt="logo" width="200"/>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running Locally
Once you have cloned the project run `npm install` inside the project directory, then you can run either:

### `npm run start:sandpit`
Runs the app in sandpit mode using .env.sandpit.
### `npm run start:prod`

Runs the app in prod mode using .env.prod.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build & Deployment
The build and deployment phase has been fully automated with CI/CD and amplify using amplify.yml as its build instructions. Any commits made to the `master` branch will trigger the CI/CD pipeline for [https://volcanomonitor.met.co.nz](https://volcanomonitor.met.co.nz) and any commits to the `test` branch will trigger CI/CD for the [test site](https://test.dml3sq7y2v7ka.amplifyapp.com). The CI/CD pipeline on prod will run the build command `npm run build:prod` and the test CI/CD will run `npm run build:sandpit`

## Amplify
The amplify environment can be viewed through the amplify console [here](https://ap-southeast-2.console.aws.amazon.com/amplify/home?region=ap-southeast-2#/d3n00b2u57xs6u)
