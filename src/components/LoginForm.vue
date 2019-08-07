<template>
  <div>
    <LoadingAndErrorHandler :error="error"></LoadingAndErrorHandler>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': !!errors.collect('email').length }"
          v-validate="'required|email'"
        />
        <div
          v-show="!!errors.collect('email').length"
          v-for="error in errors.collect('email')"
          :key="error"
          class="invalid-feedback"
        >
          {{ error }}
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': !!errors.first('password') }"
          v-validate="'required'"
        />
        <div v-show="!!errors.first('password')" class="invalid-feedback">
          {{ errors.first('password') }}
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="!!errors.all().length || loading">Login</button>
        <img
          v-show="loading"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <router-link to="/register" class="btn btn-link">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler.vue';

@Component({
  components: {
    LoadingAndErrorHandler
  }
})
export default class LoginForm extends Vue {
  email: string = '';

  password: string = '';

  loading: boolean = false;

  error: string | null = null;

  handleSubmit() {
    this.$validator.validateAll().then(result => {
      if (result) {
        this.loading = true;
        this.error = null;

        this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            this.error = error;
          });
      }
    });
  }
}
</script>
