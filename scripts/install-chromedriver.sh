#!/bin/bash
# Install ChromeDriver.
CHROME_DRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`

[ -x "$(which chromedriver)" ] && (echo "chrome driver already exists"; exit)

if [[ $(uname) == "Darwin" ]]; then
	echo "MacOS";   
	curl -s -L http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_mac64.zip --output chromedriver_mac64.zip
	unzip chromedriver_mac64.zip -d ~/
	rm chromedriver_mac64.zip
	mv -f ~/chromedriver /usr/local/bin/chromedriver
	chmod 0755 /usr/local/bin/chromedriver
	chromedriver -v
	echo "installed chromedriver binary in /usr/local/bin"

elif [[ $(uname) == "Linux" ]]; then
	echo "Linux";
	curl -s -L http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip --output chromedriver_linux64.zip
	unzip chromedriver_linux64.zip -d ~/
	rm chromedriver_linux64.zip
	mv -f ~/chromedriver /usr/local/bin/chromedriver
	chmod 0755 /usr/local/bin/chromedriver
	chromedriver -v
	echo "installed chromedriver binary in /usr/local/bin"
else
    echo "can't determine OS"
    exit 1
fi
