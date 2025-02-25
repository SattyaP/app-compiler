# Builder Electron

This package is a powerful builder for Electron applications, combined with obfuscation. It provides a function called `rebuildCate` that takes two parameters: `srcDir` (the source directory to build) and `distSrc` (the destination output of the build).

## Installation

To install this package, run the following command:

```bash
npm install @sattyap/builder-proeject

IMPORTANT !

yarn global add google-closure-compiler
# OR
npm i -g google-closure-compiler
```

## Important 

U need to have access to use this package call the dev first !

## Usage

To use the `buildProject` function, import it into your code and call it with the appropriate parameters:

```javascript
const { buildProject } = require("@sattyap/builder-project");

buildProject(srcDir, distSrc);
```

Make sure to replace `srcDir` with the path to your source directory and `distSrc` with the desired destination output directory.

## Example

Here's an example of how you can use this package in your project application:

```javascript
const { buildProject  } = require("@sattyap/builder-project");

// Build the app using the `buildProject` function
buildProject("src", "dist");
```
