<template>
  <div id="App">
    <Header></Header>
    <NavBar></NavBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>  
</template>

<script>
import Header from "common/header";
import NavBar from "common/navBar";
import Player from 'common/player/player'
export default {
  components: {
    Header,
    NavBar,
    Player
  },
};
</script>

<style lang='less' scope>
#App{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
