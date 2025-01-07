<template>
  <div>
    <CoachFilter @change-filter="setFilters" />
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">
            Refresh
          </BaseButton>
          <BaseButton v-if="!isLoggedIn" link to="/auth?redirect=register">
            Login to Register as Coach
          </BaseButton>
          <BaseButton v-if="isRegisterBtnVisible" link to="/register">
            Register as Coach
          </BaseButton>
        </div>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
    <BaseDialog :show="!!error" title="An error occurred!" @close="resetError">
      <p>{{ error }}</p>
    </BaseDialog>
  </div>
</template>

<script>
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import CoachItem from '@/components/coaches/CoachItem.vue';

export default {
  components: {
    CoachFilter,
    CoachItem,
  },

  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },

    isRegisterBtnVisible() {
      return this.isLoggedIn && !this.isCoach && !this.isLoading;
    },

    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter((coach) =>
        Object.keys(this.activeFilters).some(
          (key) => this.activeFilters[key] && coach.areas.includes(key)
        )
      );
    },

    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }

      this.isLoading = false;
    },

    resetError() {
      this.error = null;
    },
  },

  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
