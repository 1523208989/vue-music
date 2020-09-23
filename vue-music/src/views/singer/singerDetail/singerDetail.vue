<template>
  <transition appear name="detail"><!-- transition不加appear会导致enter-active动画失效 -->
    <div id="singerDetail">
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
#singerDetail {
  background: rgb(51, 47, 47);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.detail-leave-active,
.detail-enter-active {
  transition: all 0.5s;
}

.detail-enter ,.detail-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
}
</style>