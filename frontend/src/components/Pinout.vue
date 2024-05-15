<template>
  <div class="pinout" id="container">
<nav id="gpio">
<div id="pinbase"></div>
<ul class="bottom">
<li class="pin1 pow3v3" :class="highlightedType === 'pow3v3' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">1</span> 3v3 Power</span><span class="pin"></span></a></li>
<li class="pin3 gpio i2c" :class="(selectedGpio === 2 || highlightedType === 'gpio' || highlightedType === 'i2c') && 'overlay-pin'"><a v-on:click.stop="bcmPin(2)" title="Wiring Pi pin 8"><span class="default"><span class="phys">3</span> BCM 2 <small>(SDA)</small></span><span class="pin"></span></a></li>
<li class="pin5 gpio i2c" :class="(selectedGpio === 3 || highlightedType === 'gpio' || highlightedType === 'i2c') && 'overlay-pin'"><a v-on:click.stop="bcmPin(3)" title="Wiring Pi pin 9"><span class="default"><span class="phys">5</span> BCM 3 <small>(SCL)</small></span><span class="pin"></span></a></li>
<li class="pin7 gpio" :class="(selectedGpio === 4 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(4)" title="Wiring Pi pin 7"><span class="default"><span class="phys">7</span> BCM 4 <small>(GPCLK0)</small></span><span class="pin"></span></a></li>
<li class="pin9 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">9</span> Ground</span><span class="pin"></span></a></li>
<li class="pin11 gpio" :class="(selectedGpio === 17 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(17)" title="Wiring Pi pin 0"><span class="default"><span class="phys">11</span> BCM 17 </span><span class="pin"></span></a></li>
<li class="pin13 gpio" :class="(selectedGpio === 27 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(27)" title="Wiring Pi pin 2"><span class="default"><span class="phys">13</span> BCM 27 </span><span class="pin"></span></a></li>
<li class="pin15 gpio" :class="(selectedGpio === 22 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(22)" title="Wiring Pi pin 3"><span class="default"><span class="phys">15</span> BCM 22 </span><span class="pin"></span></a></li>
<li class="pin17 pow3v3" :class="highlightedType === 'pow3v3' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">17</span> 3v3 Power</span><span class="pin"></span></a></li>
<li class="pin19 gpio spi" :class="(selectedGpio === 10 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(10)" title="Wiring Pi pin 12"><span class="default"><span class="phys">19</span> BCM 10 <small>(MOSI)</small></span><span class="pin"></span></a></li>
<li class="pin21 gpio spi" :class="(selectedGpio === 9 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(9)" title="Wiring Pi pin 13"><span class="default"><span class="phys">21</span> BCM 9 <small>(MISO)</small></span><span class="pin"></span></a></li>
<li class="pin23 gpio spi" :class="(selectedGpio === 11 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(11)" title="Wiring Pi pin 14"><span class="default"><span class="phys">23</span> BCM 11 <small>(SCLK)</small></span><span class="pin"></span></a></li>
<li class="pin25 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">25</span> Ground</span><span class="pin"></span></a></li>
<li class="pin27 gpio i2c" :class="(selectedGpio === 0 || highlightedType === 'gpio' || highlightedType === 'i2c') && 'overlay-pin'"><a v-on:click.stop="bcmPin(0)" title="Wiring Pi pin 30"><span class="default"><span class="phys">27</span> BCM 0 <small>(ID_SD)</small></span><span class="pin"></span></a></li>
<li class="pin29 gpio" :class="(selectedGpio === 5 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(5)" title="Wiring Pi pin 21"><span class="default"><span class="phys">29</span> BCM 5 </span><span class="pin"></span></a></li>
<li class="pin31 gpio" :class="(selectedGpio === 6 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(6)" title="Wiring Pi pin 22"><span class="default"><span class="phys">31</span> BCM 6 </span><span class="pin"></span></a></li>
<li class="pin33 gpio" :class="(selectedGpio === 13 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(13)" title="Wiring Pi pin 23"><span class="default"><span class="phys">33</span> BCM 13 <small>(PWM1)</small></span><span class="pin"></span></a></li>
<li class="pin35 gpio spi" :class="(selectedGpio === 19 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(19)" title="Wiring Pi pin 24"><span class="default"><span class="phys">35</span> BCM 19 <small>(MISO)</small></span><span class="pin"></span></a></li>
<li class="pin37 gpio" :class="(selectedGpio === 26 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(26)" title="Wiring Pi pin 25"><span class="default"><span class="phys">37</span> BCM 26 </span><span class="pin"></span></a></li>
<li class="pin39 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">39</span> Ground</span><span class="pin"></span></a></li>
</ul>
<ul class="top">
<li class="pin2 pow5v" :class="highlightedType === 'pow5v' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">2</span> 5v Power</span><span class="pin"></span></a></li>
<li class="pin4 pow5v" :class="highlightedType === 'pow5v' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">4</span> 5v Power</span><span class="pin"></span></a></li>
<li class="pin6 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">6</span> Ground</span><span class="pin"></span></a></li>
<li class="pin8 gpio uart" :class="(selectedGpio === 14 || highlightedType === 'gpio' || highlightedType === 'uart') && 'overlay-pin'"><a v-on:click.stop="bcmPin(14)" title="Wiring Pi pin 15"><span class="default"><span class="phys">8</span> BCM 14 <small>(TXD)</small></span><span class="pin"></span></a></li>
<li class="pin10 gpio uart" :class="(selectedGpio === 15 || highlightedType === 'gpio' || highlightedType === 'uart') && 'overlay-pin'"><a v-on:click.stop="bcmPin(15)" title="Wiring Pi pin 16"><span class="default"><span class="phys">10</span> BCM 15 <small>(RXD)</small></span><span class="pin"></span></a></li>
<li class="pin12 gpio" :class="(selectedGpio === 18 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(18)" title="Wiring Pi pin 1"><span class="default"><span class="phys">12</span> BCM 18 <small>(PWM0)</small></span><span class="pin"></span></a></li>
<li class="pin14 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">14</span> Ground</span><span class="pin"></span></a></li>
<li class="pin16 gpio" :class="(selectedGpio === 23 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(23)" title="Wiring Pi pin 4"><span class="default"><span class="phys">16</span> BCM 23 </span><span class="pin"></span></a></li>
<li class="pin18 gpio" :class="(selectedGpio === 24 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(24)" title="Wiring Pi pin 5"><span class="default"><span class="phys">18</span> BCM 24 </span><span class="pin"></span></a></li>
<li class="pin20 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">20</span> Ground</span><span class="pin"></span></a></li>
<li class="pin22 gpio" :class="(selectedGpio === 25 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(25)" title="Wiring Pi pin 6"><span class="default"><span class="phys">22</span> BCM 25 </span><span class="pin"></span></a></li>
<li class="pin24 gpio spi" :class="(selectedGpio === 8 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(8)" title="Wiring Pi pin 10"><span class="default"><span class="phys">24</span> BCM 8 <small>(CE0)</small></span><span class="pin"></span></a></li>
<li class="pin26 gpio spi" :class="(selectedGpio === 7 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(7)" title="Wiring Pi pin 11"><span class="default"><span class="phys">26</span> BCM 7 <small>(CE1)</small></span><span class="pin"></span></a></li>
<li class="pin28 gpio i2c" :class="(selectedGpio === 1 || highlightedType === 'gpio' || highlightedType === 'i2c') && 'overlay-pin'"><a v-on:click.stop="bcmPin(1)" title="Wiring Pi pin 31"><span class="default"><span class="phys">28</span> BCM 1 <small>(ID_SC)</small></span><span class="pin"></span></a></li>
<li class="pin30 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">30</span> Ground</span><span class="pin"></span></a></li>
<li class="pin32 gpio" :class="(selectedGpio === 12 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(12)" title="Wiring Pi pin 26"><span class="default"><span class="phys">32</span> BCM 12 <small>(PWM0)</small></span><span class="pin"></span></a></li>
<li class="pin34 gnd" :class="highlightedType === 'gnd' && 'overlay-pin'"><a v-on:click.stop="notBcmPin" title=""><span class="default"><span class="phys">34</span> Ground</span><span class="pin"></span></a></li>
<li class="pin36 gpio" :class="(selectedGpio === 16 || highlightedType === 'gpio') && 'overlay-pin'"><a v-on:click.stop="bcmPin(16)" title="Wiring Pi pin 27"><span class="default"><span class="phys">36</span> BCM 16 </span><span class="pin"></span></a></li>
<li class="pin38 gpio spi" :class="(selectedGpio === 20 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(20)" title="Wiring Pi pin 28"><span class="default"><span class="phys">38</span> BCM 20 <small>(MOSI)</small></span><span class="pin"></span></a></li>
<li class="pin40 gpio spi" :class="(selectedGpio === 21 || highlightedType === 'gpio' || highlightedType === 'spi') && 'overlay-pin'"><a v-on:click.stop="bcmPin(21)" title="Wiring Pi pin 29"><span class="default"><span class="phys">40</span> BCM 21 <small>(SCLK)</small></span><span class="pin"></span></a></li>
</ul>
</nav>
<div id="legend">
<h1>Output Creator</h1>
<p>Select a pin on the board corresponding to the desired output.</p>
<p>The Legend bellow can be used to highlight specific types of pins.</p>
<p> <br/><em>Note that the pin's mode wil be set to OUT,<br/> overriding previous mode such as IN, PWM or CLOCK.</em></p>
<h2>Currently selected pin: {{ selectedGpio !== false ? `BCM_${selectedGpio}` : 'none' }}</h2>
<h2>Legend</h2>
<ul>
<li class="gpio" :class="highlightedType === 'gpio' && 'overlay-pin'">
<a v-on:click.stop="highligtType('gpio')" title="GPIO (General Purpose IO)">
<span class="default"></span>
<span class="pin"></span> GPIO <small>(General Purpose IO)</small>
</a>
</li>
<li class="spi" :class="highlightedType === 'spi' && 'overlay-pin'">
<a v-on:click.stop="highligtType('spi')" title="SPI (Serial Peripheral Interface)">
<span class="default"></span>
<span class="pin"></span> SPI <small>(Serial Peripheral Interface)</small>
</a>
</li>
<li class="i2c" :class="highlightedType === 'i2c' && 'overlay-pin'">
<a v-on:click.stop="highligtType('i2c')" title="I2C (Inter-integrated Circuit)">
<span class="default"></span>
<span class="pin"></span> I<sup>2</sup>C <small>(Inter-integrated Circuit)</small>
</a>
</li>
<li class="uart" :class="highlightedType === 'uart' && 'overlay-pin'">
<a v-on:click.stop="highligtType('uart')" title="UART (Universal Asyncronous Receiver/Transmitter)">
<span class="default"></span>
<span class="pin"></span> UART <small>(Universal Asyncronous Receiver/Transmitter)</small>
</a>
</li>
<li class="gnd" :class="highlightedType === 'gnd' && 'overlay-pin'">
<a v-on:click.stop="highligtType('gnd')" title="Ground">
<span class="default"></span>
<span class="pin"></span> Ground
</a>
</li>
<li class="pow5v" :class="highlightedType === 'pow5v' && 'overlay-pin'">
<a v-on:click.stop="highligtType('pow5v')" title="5v (Power)">
<span class="default"></span>
<span class="pin"></span> 5v <small>(Power)</small>
</a>
</li>
<li class="pow3v3" :class="highlightedType === 'pow3v3' && 'overlay-pin'">
<a v-on:click.stop="highligtType('pow3v3')" title="3.3v (Power)">
<span class="default"></span>
<span class="pin"></span> 3.3v <small>(Power)</small>
</a>
</li>
</ul>
<h2>Name</h2>
<input type="text" v-model="name"/>
<h2>Save</h2>
<div v-if="error" class="error-message">
  <h2>Error</h2>
  <h3>{{ error.error }}</h3>
  <p>{{ error.msg }}</p>
</div>
<button v-on:click="$emit('save-output-creator', { name:  name, bcm: selectedGpio})">Save new output</button>
<button v-on:click="$emit('cancel-output-creator')">Cancel</button>
</div>
</div>
</template>

<script>
export default {
  name: 'Pinout',
  data () {
    return {
      highlightedType: '',
      selectedGpio: false,
      name: 'New Output'
    }
  },
  props: {
    error: Object
  },
  methods: {
    notBcmPin () {
      this.highlightedType = ''
      this.selectedGpio = false
    },
    bcmPin (bcm) {
      this.selectedGpio = bcm
      this.highlightedType = ''
    },
    highligtType (type) {
      this.highlightedType = type
      this.selectedGpio = false
    }
  }
}
</script>

<style scoped>
/* stuff */
input {
  background-color: var(--fg-color);
  color: var(--font-color);
  font-family: 'Fonten';
  outline: none;
  border-width: 0.1em;
}
button {
  position: relative;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em;
  background-color: var(--fg-color);
  color: var(--font-color);
  display: inline-block;
}

/* BELLOW IS FOR PI BOARD / PINOUT / LEGEND */
ul, li, a, body, h1, h2, h3, h4, h5, h6, p {
margin: 0;
padding: 0;
text-decoration: none;
text-align: left;
}
body {
font-family: 'Avenir', sans-serif;
font-weight: 500;
font-size: 16px;
}
table {
margin: 20px 0;
border-collapse: collapse;
text-align: left;
font-size: 0.8em;
}
table td, table th {
border: 1px solid #073642;
padding: 5px;
}
table th {
background: #073642;
color: #ebe6d3;
}
table.details {
width: 100%;
}
table.details td, table.details th {
border: none;
font-size: 16px;
vertical-align: top;
}
table.details img {
margin-top: 54px;
}
table.pin-functions {
width: 100%;
}
table.pin-functions td {
width: 16.6666%;
}
.prettyprint {
word-wrap: break-word;
}
img.grayscale {
filter: url("data:image/svg+xml;utf8,&lt;svg xmlns='http://www.w3.org/2000/svg'&gt;&lt;filter id='grayscale'&gt;lt;feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/&gt;lt;filter&gt;lt;svg&gt;grayscale");
/* Firefox 10+, Firefox on Android */
filter: gray;
/* IE6-9 */
-webkit-filter: grayscale(100%);
/* Chrome 19+, Safari 6+, Safari 6+ iOS */
}
#container {
margin: 0 auto;
position: relative;
padding-top: 4px;
}
/* Left Column */
#leftcolumn {
float: left;
width: 500px;
}
#crumbtrail {
background: #073642;
}
#crumbtrail p {
color: #fff;
margin: 0;
padding: 5px 15px;
}
#crumbtrail a, #crumbtrail a:hover, #crumbtrail a:active {
color: #fff;
}
#crumbtrail a.more {
text-align: center;
display: block;
}
#crumbtrail a:hover {
text-decoration: underline;
}
#interfaces {
background: #6c71c4;
padding: 0px 0px 2px 2px;
display: block;
clear: both;
line-height: 2px;
text-align: right;
}
#interfaces ul, #interfaces li {
list-style: none;
margin: 0;
padding: 0;
}
#interfaces li {
display: inline-block;
}
#interfaces li a {
display: inline-block;
padding: 3px 10px 3px 10px;
margin-top: 2px;
margin-right: 2px;
background: #5a5fbd;
color: #fff;
font-size: 0.9em;
line-height: 1.45em;
}
#interfaces li a:hover {
color: #5a5fbd;
background: #e2e3f3;
}
#interfaces li.selected a {
background: #484fb5;
color: #fff;
text-decoration: underline;
}
/* GPIO nav */
nav {
position: relative;
width: 292px;
background: #5f8645;
min-height: 653px;
margin-right: 208px;
border-top-right-radius: 46px;
border-bottom-right-radius: 46px;
display: inline-block;
}
nav:before, nav:after {
content: '';
display: block;
width: 28px;
height: 28px;
background: #fff;
border-radius: 50%;
border: 14px solid #f7df84;
right: 19px;
top: 19px;
position: absolute;
}
nav:after {
top: auto;
bottom: 19px;
}
#gpio ul {
position: absolute;
top: 87px;
list-style: none;
}
#gpio a {
display: block;
position: relative;
font-size: 1em;
line-height: 23px;
height: 22px;
margin-bottom: 2px;
}
#gpio .phys {
color: #073642;
font-size: 0.8em;
opacity: 0.8;
position: absolute;
left: 30px;
text-indent: 0;
}
#gpio .pin {
display: block;
border: 1px solid transparent;
border-radius: 50%;
width: 16px;
height: 16px;
background: #002b36;
position: absolute;
right: 2px;
top: 2px;
}
#gpio .pin:after {
content: '';
display: block;
border-radius: 100%;
background: #fdf6e3;
position: absolute;
left: 5px;
top: 5px;
width: 6px;
height: 6px;
}
#gpio .top {
left: 246px;
}
#gpio .top li {
text-indent: 56px;
}
#gpio .top a {
width: 250px;
border-top-left-radius: 13px;
border-bottom-left-radius: 13px;
}
#gpio .top .overlay-ground .phys {
padding-left: 31px;
left: 0;
}
#gpio .top .pin {
left: 2px;
top: 2px;
}
#gpio .top .gnd a .default{
  opacity: 0.5
}
#gpio .bottom {
left: 0px;
}
#gpio .bottom a {
text-indent: 10px;
color: #e9e5d2;
width: 244px;
border-top-right-radius: 13px;
border-bottom-right-radius: 13px;
}
#gpio .bottom .overlay-ground .phys {
padding-right: 32px;
right: 0;
}
#gpio .bottom .phys {
text-align: right;
left: auto;
right: 30px;
}
#gpio .bottom .gnd a {
color: rgba(233, 229, 210, 0.5);
}
#gpio .bottom .gnd a:hover {
color: rgba(6, 53, 65, 0.5);
}
#gpio a:hover, #gpio .active a {
background: #f5f3ed;
color: #063541;
}
#gpio li a small {
font-size: 0.7em;
}
#gpio .overlay-pin a {
background: #ebe6d3;
color: #063541;
}
#legend .overlay-pin a {
background: #ebe6d3;
color: #063541;
}
#gpio .overlay-pin a:hover {
background: #f5f3ed;
color: #063541;
}
#gpio .overlay-pin.gnd a {
color: rgba(6, 53, 65, 0.5);
}
#gpio .overlay-power .phys {
color: #fff;
opacity: 1;
}
#gpio .overlay-power a {
background: #073642;
color: #fff;
}
#gpio .overlay-power a:hover {
background: #268bd2;
}
#gpio .overlay-ground .phys {
background: #073642;
color: #fff;
opacity: 1;
position: absolute;
top: 0px;
width: 20px;
height: 22px;
border-radius: 11px;
text-indent: 0px;
line-height: 22px;
}
#gpio .overlay-ground a:hover .phys {
background: #268bd2;
}
#gpio .overlay-ground span.pin {
background: #073642;
}
#gpio ul li.hover-pin a, #gpio .bottom li.hover-pin a {
color: #fff;
background: rgba(200, 0, 0, 0.6);
}
#gpio .pin1 a:hover, #gpio .pin1.active a, #gpio .pin1 .pin {
border-radius: 0;
}
#gpio .pow3v3 .pin {
background: #b58900;
}
#gpio .pow5v .pin {
background: #dc322f;
}
#gpio .gpio .pin {
background: #859900;
}
#gpio .i2c .pin {
background: #268bd2;
}
#gpio .spi .pin {
background: #d33682;
}
#gpio .uart .pin {
background: #6c71c4;
}
#legend {
  display: inline-block;
}
/*#legend h2 {
margin-top: 20px;
margin-bottom: 5px;
font-size: 16px;
}*/
#legend ul, #legend li {
list-style: none;
margin: 0;
padding: 0;
}
#legend li {
position: relative;
margin-bottom: 2px;
line-height: 20px;
}
#legend li small {
font-size: 10px;
}
#legend a {
padding: 0 12px 0 30px;
}
#legend li, #legend a {
}
#legend .pow3v3 .pin {
background: #b58900;
}
#legend .pow5v .pin {
background: #dc322f;
}
#legend .gpio .pin {
background: #859900;
}
#legend .i2c .pin {
background: #268bd2;
}
#legend .spi .pin {
background: #d33682;
}
#legend .uart .pin {
background: #6c71c4;
}
#legend .pin {
display: block;
border: 1px solid transparent;
border-radius: 50%;
width: 16px;
height: 16px;
background: #002b36;
position: absolute;
left: 2px;
top: 2px;
}
#legend .pin:after {
content: '';
display: block;
border-radius: 100%;
background: #fdf6e3;
position: absolute;
left: 5px;
top: 5px;
width: 6px;
height: 6px;
}
#pinbase {
width: 58px;
position: absolute;
left: 216px;
height: 493px;
background: #073642;
top: 80px;
}
.boards-page nav {
margin-right: 0;
}
.boards-page #leftcolumn {
width: 302px;
}
.boards-page #content {
width: 698px;
}
@media (min-width: 500px) {
#container {
}
.board {
right: 1200px;
}
#content {
width: 700px;
}
.boards-page #content {
width: 898px;
}
}
</style>
