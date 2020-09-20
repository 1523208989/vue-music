<template>
  <div id="App">
    <Header></Header>
    <NavBar></NavBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>  
</template>

<script>
import Header from "common/header";
import NavBar from "common/navBar";
export default {
  components: {
    Header,
    NavBar,
  },
};
</script>

<style lang='less' scope>
#App{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
