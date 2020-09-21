<template>
  <div>
    <card v-for="(item,key) of songList" :key="key">
      <img slot="img" v-lazy="item.imgurl" alt />
      <p slot="title">{{item.dissname}}</p>
      <p slot="author">{{item.creator.name}}</p>
    </card>
  </div>
</template>

<script>
import Card from "components/card";
export default {
  props: {
    songList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    Card,
  },
};
</script>

<style>
</style>