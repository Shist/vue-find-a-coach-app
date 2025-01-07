<template>
  <div>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <p v-if="emailError" class="errors">
          {{ emailError }}
        </p>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            autocomplete="on"
            v-model.trim="password"
          />
        </div>
        <div v-if="mode === 'signup'" class="form-control">
          <label for="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            autocomplete="on"
            v-model.trim="repeatPassword"
          />
        </div>
        <p v-if="passwordError" class="errors">
          {{ passwordError }}
        </p>
        <BaseButton>{{ submitBtnLabel }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeBtnLabel }}
        </BaseButton>
      </form>
    </BaseCard>
    <BaseDialog :show="isLoading" title="Authenticating..." fixed>
      <BaseSpinner />
    </BaseDialog>
    <BaseDialog :show="!!error" title="An error occurred" @close="resetError">
      <p>{{ error }}</p>
    </BaseDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      emailError: null,
      passwordError: null,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },

  computed: {
    submitBtnLabel() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },

    switchModeBtnLabel() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },

  methods: {
    validateEmail() {
      if (!this.email) {
        this.emailError = 'Email must not be empty.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = 'Entered email is not valid.';
      } else {
        this.emailError = null;
      }
    },

    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Password must not be empty.';
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters long.';
      } else if (!/^(?=.*[a-z])(?=.*\d).+$/i.test(this.password)) {
        this.passwordError =
          'Password must contain at least one letter and one digit.';
      } else if (
        this.mode === 'signup' &&
        this.password !== this.repeatPassword
      ) {
        this.passwordError = 'The entered passwords do not match.';
      } else {
        this.passwordError = null;
      }
    },

    async submitForm() {
      this.validateEmail();
      this.validatePassword();

      if (this.emailError || this.passwordError) {
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
          // TODO
        } else {
          await this.$store.dispatch('auth/signup', {
            email: this.email,
            password: this.password,
          });
        }
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }

      this.email = '';
      this.password = '';
      this.repeatPassword = '';
      this.emailError = null;
      this.passwordError = null;
    },

    resetError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
