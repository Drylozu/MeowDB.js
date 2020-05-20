# Changelog
All notable changes to this project will be documented in this file.

## 2.1.2 - JSDocs
- Added JSDoc in TS declaration file.
- Added CHANGELOG file.
- Changed MeowDB Banner from README.
- Added use of `set` function in the example.

## 2.1.1 - Added TS support
- Updated LICENSE file.
- Added MeowDB Banner in README.
- Added TS Import in README example.
- Added TS declaration file (for the TS support).
- Added JSDoc in every JS file.

## 2.1.0 - Unpromisified
- Added `eslint` to the project.
- Added `.gitignore` (before there was nothing to ignore, now there's).
- Added shields.io images in README.
- Restructured example.
- Renamed project from `meowdb` to `MeowDB.js`.
- Added Ruby repository/gem to README.

## 2.0.7 - Error fixed
- `set(id, array)` didn't work well before, now it does (It threw an error).

## 2.0.6 - Unpromisified function
- `get` function don't returns a Promise now.

## 2.0.5 - More private things
- `_options` and `_utils` properties are now private in the MeowDB class.
- Added `@returns` (JSDoc) in every function.

## 2.0.4 - A "big" error
- `sValue` -> `value` in `set` function.

## 2.0.3 - Little things fixed
- Changed actual version from v2.0.1 to v2.0.3 in the README file.

## 2.0.2 - Another little things
- Actual version ("*Released v-.-.-*") is now in **bold**.

## 2.0.1 - Spelling errors fixed
- Some things added/removed from the README.

## 2.0.0 - Rework
- Restructured README, less information and more facility.
- Removed every file/class/function (without lossing his structure).
- `checkName` is now in the MeowDB constructor.
- Synchronous functions but returns `Promise`.
- The utils are now a class.

## 1.2.0 - More information
- Added example in README.
- Added a long documentation for all files in README.
- More code in the example file.

## 1.1.0 - Private things
- Renamed `structures/` classes.
- Functions work independently.
- `checkId` function now supports *all* (*).
- `createData` function without an default value in `sValue` parameter.

## 1.0.1 - Spelling errors fixed
- Added `p` in `example` (test script of `package.json`).

## 1.0.0 - First release
- Added main files (LICENSE, README, structures/ and index).
- JSDocs in JS files.
- Create, delete, get, set, all and sort functions.
- **A bad thing**, everything async.