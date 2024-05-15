# Temperature-controller-for-pi
Project made for personal use in 2020

## Temperature measuring and relay control through a web application.

## Setup
### Initial setup
_This setup guide is made for linux, if you're using Windows/Mac then some parts may not be applicable_
1. First of download and install the Raspberry Pi OS Lite from the [Raspberry pi downloads page](https://www.raspberrypi.org/downloads/raspberry-pi-os/).
2. Write the downloaded using the bellow command (replace the X in /dev/sdX with the device )
  ```
  dd bs=4M if=2020-05-27-raspios-buster-lite-armhf.img of=/dev/sdX conv=fsync
  ```
3. Enable ssh with bellow commands, replacing `/user/media` with the path to your mounted sd card:
  ```
  cd /user/media/boot
  touch ssh
  ```
4. Setup wireless network by opening `rootfs/etc/wpa_supplicant/wpa_supplicant.conf` and append the following:
  ```
  network={
    ssid="network-name"
    psk="network-password"
  }
  ```

### Installing everything
1. First build both the frontend and backend. For this you need Node and npm installed on the device, then run the following command in both the frontend and backend folders:
  ```
  npm install
  npm run build-pi
  ```
2. Move everything, excluding the frontend and backend folders to the raspberry pi.
3. Run `install.sh` and hope for the best. For some file changes the user must be root, sudo is not good enough. So write `sudo su` and run `su-install.sh`.
4. When the rasp-config opens, go to interfaces and enable 1-wire, set the hostname to `pi` and change the password of the user `pi`.
