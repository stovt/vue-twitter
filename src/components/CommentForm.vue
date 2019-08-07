<template>
  <div>
    <form class="mt-3" @submit.prevent="handleSubmit">
      <div class="form-group">
        <textarea
          v-model="message"
          rows="2"
          placeholder="What's happening?"
          name="message"
          class="form-control"
          :class="{ 'is-invalid': !!errors.first('message') }"
          v-validate="'required'"
        ></textarea>
        <div v-show="!!errors.first('message')" class="invalid-feedback">
          {{ errors.first('message') }}
        </div>
      </div>
      <div class="form-group text-right">
        <button class="btn btn-primary" :disabled="!!errors.all().length || loading">
          Comment
        </button>
        <img
          v-show="loading"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
      </div>
    </form>
    <LoadingAndErrorHandler :loading="loading" :error="error"></LoadingAndErrorHandler>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler.vue';

@Component({
  components: {
    LoadingAndErrorHandler
  }
})
export default class CommentForm extends Vue {
  @Prop() private parent!: number;

  message: string = '';

  loading: boolean = false;

  error: string | null = null;

  handleSubmit() {
    this.$validator.validateAll().then(result => {
      if (result) {
        this.loading = true;
        this.error = null;

        this.$store
          .dispatch('comment', {
            message: this.message.replace(/\r?\n/g, '<br/>'),
            parent: this.parent
          })
          .then(() => {
            this.message = '';
            this.$validator.reset();
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
