#!/bin/bash

if [[ $(uname) != "Linux" ]]; then
    echo "Only for Linux, exiting";
    exit;
fi

sudo apt-get update
sudo apt-get install -y --no-install-recommends zip unzip firefox g++ net-tools ttfautohint fontforge ed jq wget fontforge python-dev screen
sudo apt-get install -yq libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libnss3 lsb-release xdg-utils

wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo echo "deb http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt-get update
sudo apt-get install --no-install-recommends google-chrome-stable -y
#sudo apt-get install chromium-chromedriver -y
sudo apt-get autoremove -y
sudo apt-get autoclean
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/* /var/cache/apt/*

#sudo ln -s /usr/lib/chromium-browser/chromedriver /usr/bin/chromedriver