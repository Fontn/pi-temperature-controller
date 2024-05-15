<template>
  <div class="about">
    <h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Pi_Temperature_Monitor_0"></a>Pi Temperature Monitor</h1>
    <h2 class="code-line" data-line-start=1 data-line-end=2 ><a id="Temperature_based_output_control_for_the_raspberry_pi_1"></a>Temperature based output control for the raspberry pi</h2>
    <h3 class="code-line" data-line-start=2 data-line-end=3 ><a id="Application_info_2"></a>Application info</h3>
    <p class="has-line-data" data-line-start="3" data-line-end="4">This is a web application for monitoring and controlling a Raspberry pi with connected 1-wire sensors. It was specifically made to handle the <code>DS18B20</code> sensors and output a single signal to a relay.</p>
    <h3 class="code-line" data-line-start=5 data-line-end=6 ><a id="Sensors_5"></a>Sensors</h3>
    <p class="has-line-data" data-line-start="6" data-line-end="8">The sensors are connected using the 1-wire communication bus. For the sensors to show up in the application the current sensors will have to be reset. This can be done by pressing <code>Reset Sensors</code> at the bottom of the settings page.<br>All connected sensors should now show up at the top of the page.</p>
    <h3 class="code-line" data-line-start=9 data-line-end=10 ><a id="Outputs_9"></a>Outputs</h3>
    <p class="has-line-data" data-line-start="10" data-line-end="11">The outputs are listed under a separate tab and each correspond to a GPIO pin. A new output can be created and set by pressing the <code>+</code> button and choosing the desired pin on the board.</p>
    <h3 class="code-line" data-line-start=12 data-line-end=13 ><a id="Jobs_12"></a>Jobs</h3>
    <p class="has-line-data" data-line-start="13" data-line-end="14">The logic is added using Jobs and Conditions. These can be accessed in the settings page and corresponds to a single output. Here a logical condition can be created using the <code>Condition Editor</code>. Add new operations, constant or sensors using the <code>+</code> button and modify their type and value. All parts of the condition can be modified by pressing on a specific part of the condition.</p>
    <p class="has-line-data" data-line-start="15" data-line-end="16">Jobs are runned every <code>n</code> minutes. At which the sensors will be read, the conditions will be checked and outputs will change. To modify the rate <code>n</code> this press the <code>Change Jobs Update Rate</code> button in settings.</p>
  </div>
</template>
