<template>
  <div>
    <h2>Register</h2>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          v-model="firstName"
          name="firstName"
          class="form-control"
          :class="{ 'is-invalid': !!errors.first('firstName') }"
          v-validate="'required'"
        />
        <div v-show="!!errors.first('firstName')" class="invalid-feedback">
          {{ errors.first('firstName') }}
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          v-model="lastName"
          name="lastName"
          class="form-control"
          :class="{ 'is-invalid': !!errors.first('lastName') }"
          v-validate="'required'"
        />
        <div v-show="!!errors.first('lastName')" class="invalid-feedback">
          {{ errors.first('lastName') }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': !!errors.collect('email').length }"
          v-validate="'required'"
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
          :class="{ 'is-invalid': !!errors.collect('password').length }"
          v-validate="'required|min:6'"
        />
        <div
          v-show="!!errors.collect('password').length"
          v-for="error in errors.collect('password')"
          :key="error"
          class="invalid-feedback"
        >
          {{ error }}
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          name="confirmPassword"
          class="form-control"
          :class="{ 'is-invalid': !!errors.first('confirmPassword') }"
          v-validate="{ is: password }"
        />
        <div v-show="!!errors.first('confirmPassword')" class="invalid-feedback">
          Passwords should match
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">Register</button>
        <img
          v-show="loading"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <router-link to="/login" class="btn btn-link">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RegisterPage extends Vue {
  firstName: string = '';

  lastName: string = '';

  email: string = '';

  password: string = '';

  confirmPassword: string = '';

  handleSubmit() {
    this.$validator.validateAll().then(result => {
      if (result) {
        this.$store.dispatch('register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        });
      }
    });
  }

  get loading() {
    return this.$store.state.profile.loading;
  }

  get error() {
    return this.$store.state.profile.registerError;
  }
}
</script>
