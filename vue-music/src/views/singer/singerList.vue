<template>
  <div class="singerList">
    <song-card v-for="(item,key) of singerList" :key="key">
      <img slot="img" v-lazy="item.singer_pic" alt />
      <p slot="title">{{item.singer_name}}</p>
    </song-card>
  </div>
</template>

<script>
import songCard from "components/songCard";
export default {
  props: {
    singerList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    songCard,
  },
};
</script>

<style>
</style>