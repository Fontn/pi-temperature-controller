#!/bin/bash

#####################################################################################################
# THIS IS A TEMPORARY SCRIPT THAT IS USED FOR TESTING. RETURNS RANDOM TEMPERATURES FOR EACH SENSOR. #
#####################################################################################################

# Prints all temperature sensors id and temp in milli celcius
#shopt -s nullglob

# Gets a list of all the sensors in the specified folder
# Might be different depending on OS version
W1DEVICESPATH=/home/erik/documents/git/pi-temp-fan/backend/devices
SENSORS="${W1DEVICESPATH}/*"


# Loops through all sensors
for s in $SENSORS
do
  #RANDOM=$(date '+%N')
  if [ -d $s ] && [ $s != "${W1DEVICESPATH}/w1_bus_master1" ]
  then
    # Read the temperature sensor
    TEMPREAD=$(cat "${s}/w1_slave")

    # Prints the file name (the sensors id)
    echo "${s##*/}"

    # Prints the last item in the sensor data (the temperature)
    #echo "${TEMPREAD##* }"
    echo "t=${RANDOM}"
  fi
done
