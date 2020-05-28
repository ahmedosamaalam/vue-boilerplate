<template>
  <div>
    <form
      :class="`md-alignment-center-center`"
      novalidate
      class="md-layout"
      @submit.prevent="validateForm"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ title }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input
                name="password"
                id="password"
                type="password"
                v-model="form.password"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
              <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="submitForm">Login success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  props: {
    title: String,
    submit: Function,
    sending: Boolean,
    submitForm: Boolean,
  },
  data: () => ({
    form: {
      email: null,
      password: null,
    },
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.password = null;
      this.form.email = null;
    },
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    saveUser() {
      const payload = {
        email: this.form.email,
        password: this.form.password,
      };
      this.$emit('submit', payload);
    },
  },
};
</script>

<style scoped lang="scss"></style>
