<template>
  <div>
    <h2>Register</h2>
    <RegisterForm></RegisterForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RegisterForm from '@/components/RegisterForm.vue';

@Component({
  components: {
    RegisterForm
  }
})
export default class RegisterPage extends Vue {}
</script>
