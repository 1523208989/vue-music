<template>
  <div class="progress">
    <svg
      :width="wd"
      :height="wd"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="circle-bg"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        stroke-dasharray='314'
      ></circle>
      <circle
        class="circle-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dasharray"
      ></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    wd: {
      type: Number,
      default: 100,
    },
    percent: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    dasharray() {
      return `${(1-this.percent)*314} 314`;
    },
  },
};
</script>

<style lang='less' scoped >
.progress {
  position: relative;
}
svg {
  position: absolute;
  top:50%;
  transform: translate(0,-50%);
  circle {
    stroke:rgba(23, 23, 23, 0.3);
    stroke-width: 11px;
    transform-origin: center;
    transform: rotateX(180deg) rotateZ(90deg) scale(0.8);
    &:first-child {
      stroke:transparent;
    }
  }
}
</style>