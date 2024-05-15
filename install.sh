#!/bin/sh
# This is an install script that should install all necessary things.

### Update and upgrade
sudo apt update
sudo apt full-upgrade -y

### Installing packages
# Install Node
sudo apt install nodejs -y
sudo apt install npm -y

### Setup backend with pm2
# Install node packages
npm --prefix ./api install
# Install pm2 using npm
sudo npm install -g pm2
# Start the app and make it start on startup with pm2
pm2 start api/server.js
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
pm2 save

### Setup one-wire using gui, it appears to be the most stable from update to update
sudo raspi-config
