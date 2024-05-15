<template>
  <div id="app" :style="cssColors">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/history">History</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/outputs">Outputs</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view :settings="settings" :colors="colors"/>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      settings: {},
      colors: {
        primary: '#bebe64',
        secondary: '#969896',
        font: '#cfcfcf',
        bg: '#131313',
        fg: '#1f1f1f',
        heading: '#ffffff'
      }
    }
  },
  computed: {
    cssColors () {
      return {
        '--primary-color': this.colors.primary,
        '--secondary-color': this.colors.secondary,
        '--font-color': this.colors.font,
        '--bg-color': this.colors.bg,
        '--fg-color': this.colors.fg,
        '--heading-color': this.colors.heading
      }
    }
  },
  async created () {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/settings`)
    this.settings = response.data
  }
}
</script>

<style>
/*@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');*/
@font-face {
    font-family: 'Fonten';
    src: url('./assets/font.ttf');
}
/*:root {
    --primary-color: #435390;
    --secondary-color: #7A7760;
    --font-color: #424242;
    --bg-color: #fff;
    --heading-color: #292922;
}
[data-theme="dark"] {
    --primary-color: #9A97F3;
    --secondary-color: #818cab;
    --font-color: #e1e1ff;
    --bg-color: #161625;
    --heading-color: #818cab;
}*/
html, body {
  padding: 0;
  margin: 0;
  display: table;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Fonten', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
  background-color: var(--bg-color);
}
h1, h2, h3, h4, h5, h6 {
  color: var(--heading-color);
}
#nav {
  padding: 30px;
  font-size: 1.5em;
}
#nav a {
  font-weight: bold;
  color: var(--secondary-color);
}
a {
  font-weight: bold;
  color: var(--secondary-color);
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: var(--primary-color);
}
</style>
