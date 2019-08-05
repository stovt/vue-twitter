<template>
  <div>
    <h2>Login</h2>
    <div v-if="$route.query.fromRegister" class="alert alert-success" role="alert">
      Registration Successful. Please Login
    </div>
    <LoginForm></LoginForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/LoginForm.vue';

@Component({
  components: {
    LoginForm
  }
})
export default class LoginPage extends Vue {}
</script>
