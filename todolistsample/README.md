Todo list sample
================

The aim of this project is to have a simple application to starting creating unit tests

<!-- TOC -->

- [Requirements](#requirements)
- [Check that you have node and npm installed](#check-that-you-have-node-and-npm-installed)
- [Initialize the project](#initialize-the-project)
- [Running the server](#running-the-server)
- [Running the application](#running-the-application)
- [Build](#build)
- [Running unit tests](#running-unit-tests)

<!-- /TOC -->

## Requirements
 - [node](https://nodejs.org/en/download/)

## Check that you have node and npm installed
To check if you have Node.js installed, run this command in your terminal:
```shell
node -v
```

To confirm that you have npm installed you can run this command in your terminal:
```
npm -v
```

## Initialize the project
Before starting you have to install all project dependencies
```shell
git clone git@sources.devtools.local:mguiral/todolistsample.git
npm install
```

## Running the server

First install JSON server
```shell
npm install -g json-server
```

Open a shell then initialize the database and run the server
```
cp db_init.json db.json
json-server db.json
```

## Running the application

You the following command in another shell to run a dev server

```
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
