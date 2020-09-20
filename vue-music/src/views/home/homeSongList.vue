<template>
  <div>
    <song-card v-for="(item,key) of songList" :key="key">
      <img slot="img" :src="item.imgurl" alt />      
      <p slot="title">{{item.dissname}}</p>
      <p slot="author">{{item.creator.name}}</p>
    </song-card>
  </div>
</template>

<script>
import SongCard from "components/songCard";
export default {
  props: {
    songList: {
      type: Array,
      default: [],
    },
  },
  components: {
    SongCard,
  },
};
</script>

<style>
</style>