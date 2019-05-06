#!/bin/bash
# Makes it easier to use wdio directly - execute from root directory
# source scripts/source.init.sh
export PATH=$PATH:./node_modules/.bin

pkill "Google Chrome"
pkill "Chromium"
#npm install