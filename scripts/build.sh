#!/bin/sh

rm -rf dist
./node_modules/.bin/webpack --config webpack.build.config.js

rm -rf modules
./node_modules/.bin/babel src --out-dir modules
