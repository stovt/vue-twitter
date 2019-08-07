<template>
  <div>
    <div v-if="loading" class="alert alert-secondary" role="alert">Loading...</div>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoadingAndErrorHandler extends Vue {
  @Prop({ default: false }) private loading!: boolean;

  @Prop({ default: null }) private error!: string | null;
}
</script>
