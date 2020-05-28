<template>
  <div class="lg-layout md-gutter" :class="`md-alignment-center-center`">
    <LoginForm
      :sending="sending"
      :submitForm="submitForm"
      title="My Login Form"
      @submit="onSubmitForm"
      ref="form"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/forms/LoginForm.vue';

export default {
  name: 'Login',
  data: () => ({
    sending: false,
    submitForm: false,
  }),
  components: {
    LoginForm,
  },
  methods: {
    onSubmitForm(payload) {
      (this.sending = true), (this.submitForm = true);
      console.log('paylog', payload);

      window.setTimeout(() => {
        (this.sending = false), (this.submitForm = false);
        this.$refs.form.clearForm();
      }, 1500);
    },
  },
};
</script>
