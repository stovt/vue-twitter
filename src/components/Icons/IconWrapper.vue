<template>
  <div class="iconWrapper"><slot></slot></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class IconWrapper extends Vue {}
</script>

<style scoped>
.iconWrapper {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
}
.iconWrapper svg {
  cursor: pointer;
  fill: currentcolor;
}
</style>
