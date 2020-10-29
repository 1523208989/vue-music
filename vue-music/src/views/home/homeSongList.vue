<template>
  <div>
    <card
      v-for="(item, key) of songList"
      :key="key"
      @click.native="selectItem(item),setPlayList([])"
    >
      <img slot="img" v-lazy="item.imgurl" alt />
      <p slot="title">{{ item.dissname }}</p>
      <p slot="author">{{ item.creator.name }}</p>
    </card>
  </div>
</template>

<script>
import Card from "components/card";
import { mapMutations } from "vuex";
export default {
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapMutations(["setSinger", "setPlayList"]),
    ...mapMutations({ setSinger: "setSinger", setPlayList: "setPlayList" }),
    selectItem(item) {
      this.$router.push({ path: `/home/${item.dissid}` });
      this.setSinger(item);
    },
  },
  components: {
    Card,
  },
};
</script>

<style>
</style>