<template>
  <div>
    <div v-if="isLoading">
      <BaseSpinner />
    </div>
    <section v-else-if="!isCoach">
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
  </div>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },

  data() {
    return {
      isLoading: false,
      isSending: false,
      error: null,
    };
  },

  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },

  methods: {
    async loadCoaches() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: false,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }

      this.isLoading = false;
    },

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

  async mounted() {
    if (!this.$store.getters['coaches/hasCoaches']) {
      await this.loadCoaches();
    }

    if (this.isCoach) {
      this.$router.replace('/coaches');
    }
  },
};
</script>
