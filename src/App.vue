<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item @click="$router.push({ name: 'Leads'})">Выбор сделки</b-nav-item>
        <b-nav-item @click="$router.push({ name: 'Logs'})">История</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view id="content" />
  </div>
</template>
<script>

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#content {
  padding: 20px;
}
</style>
