<template>
  <!-- <nav id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/ingame">InGame</router-link> |
    <router-link to="/inlobby">InLobby</router-link>
  </nav> -->
  <!-- <router-view :key="$route.fullPath" /> -->
  <!-- <router-view :key="$route.path" /> -->
  <router-view />
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style>
@import url("https://webfontworld.github.io/SCoreDream/SCoreDream.css");
* {
  font-family: "SCoreDream";
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */

/* 코딩 끝나면 지워주세요 */
/* div {
  border-style: solid;
  border-width: 1px;
} */
/* div {
  box-shadow: 0 0 0 1px #f00 inset;
} */
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
}
.lobby {
  border-color: #5b3700;
  border-radius: 5px;
}
.lobby-back {
  background-color: #b4b4b4;
}

.lobby:hover {
  color: white;
}
.text-white {
  color: white;
}
.text-center {
  text-align: center;
}
</style>
