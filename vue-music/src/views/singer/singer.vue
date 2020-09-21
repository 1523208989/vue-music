<template>
  <scroll :data="singerList">
    <div id="singer">
      <singer-list :singerList="singerList"></singer-list>
      <loading v-show="!singerList.length"></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/scroll";
import Loading from "components/loading";
import singerListApi from "api/singer/singerList";
import SingerList from "./singerList";
export default {
  data() {
    return {
      singerList: [],
    };
  },
  created() {
    this._getSongerList();
  },
  methods: {
    _getSongerList() {
      singerListApi().then((res) => {
        console.log(res.data.singerList.data.singerlist);
          this.singerList = res.data.singerList.data.singerlist;
      });
    },
  },
  components: {
    SingerList,
    Scroll,
    Loading,
  },
};
</script>

<style>
</style>