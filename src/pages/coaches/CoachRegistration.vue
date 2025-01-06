<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
      <div v-if="isSending">
        <BaseSpinner />
      </div>
    </BaseCard>
  </section>
  <BaseDialog :show="!!error" title="An error occurred!" @close="resetError">
    <p>{{ error }}</p>
  </BaseDialog>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },

  data() {
    return {
      isSending: false,
      error: null,
    };
  },

  methods: {
    async saveData(data) {
      this.isSending = true;

      try {
        await this.$store.dispatch('coaches/registerCoach', data);

        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }

      this.isSending = false;
    },

    resetError() {
      this.error = null;
    },
  },
};
</script>
