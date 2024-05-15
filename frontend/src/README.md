# Pi Temperature Monitor
## Temperature based output control for the raspberry pi
### Application info
This is a web application for monitoring and controlling a Raspberry pi with connected 1-wire sensors. It was specifically made to handle the `DS18B20` sensors and output a single signal to a relay.

### Sensors
The sensors are connected using the 1-wire communication bus. For the sensors to show up in the application the current sensors will have to be reset. This can be done by pressing `Reset Sensors` at the bottom of the settings page.
All connected sensors should now show up at the top of the page.

### Outputs
The outputs are listed under a separate tab and each correspond to a GPIO pin. A new output can be created and set by pressing the `+` button and choosing the desired pin on the board.

### Jobs
The logic is added using Jobs and Conditions. These can be accessed in the settings page and corresponds to a single output. Here a logical condition can be created using the `Condition Editor`. Add new operations, constant or sensors using the `+` button and modify their type and value. All parts of the condition can be modified by pressing on a specific part of the condition.

Jobs are runned every `n` minutes. At which the sensors will be read, the conditions will be checked and outputs will change. To modify the rate `n` this press the `Change Jobs Update Rate` button in settings.
