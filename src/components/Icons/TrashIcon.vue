<template>
  <IconWrapper>
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
      />
    </svg>
  </IconWrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconWrapper from '@/components/Icons/IconWrapper.vue';
@Component({
  components: {
    IconWrapper
  }
})
export default class TrashIcon extends Vue {}
</script>

<style scoped>
svg {
  color: rgb(101, 119, 134);
}
svg:hover {
  color: rgb(224, 36, 94);
}
</style>
