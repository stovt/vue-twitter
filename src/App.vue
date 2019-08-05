<template>
  <div class="container">
    <div class="row py-5">
      <div class="col-sm-6 offset-sm-3">
        <h1 class="text-primary text-center">Twitter</h1>
        <Navigation></Navigation>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';
import UserService from '@/services/UserService';

@Component({
  components: {
    Navigation
  }
})
export default class App extends Vue {
  // eslint-disable-next-line class-methods-use-this
  mounted() {
    UserService.checkAuth();
  }
}
</script>
