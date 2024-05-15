<template>
  <div class="loading">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 103 100" enable-background="new 0 0 103 100" xml:space="preserve">
      <rect fill="#fff" width="3" height="100" transform="translate(0) rotate(180 3 50)">
        <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"/>
      </rect>
      <rect x="17" fill="#fff" width="3" height="100" transform="translate(0) rotate(180 20 50)">
        <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.1s"/>
      </rect>
      <rect x="40" fill="#fff" width="3" height="100" transform="translate(0) rotate(180 40 50)">
        <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.3s"/>
      </rect>
      <rect x="60" fill="#fff" width="3" height="100" transform="translate(0) rotate(180 58 50)">
        <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.5s"/>
      </rect>
      <rect x="80" fill="#fff" width="3" height="100" transform="translate(0) rotate(180 76 50)">
        <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.1s"/>
      </rect>
      <rect x="100" fill="#fff" width="3" height="100" transform="translate(0) rotate(180 94 50)">
        <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin="0.2s"/>
      </rect>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.loading svg {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 20em;
  height: 20em;
  transform: translate(-50%, -50%);
}
</style>
