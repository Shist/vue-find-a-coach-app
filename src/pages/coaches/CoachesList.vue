<template>
  <CoachFilter @change-filter="setFilters" />
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline" @click="loadCoaches">Refresh</BaseButton>
        <BaseButton v-if="!isCoach" link to="/register">
          Register as Coach
        </BaseButton>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></CoachItem>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </BaseCard>
  </section>
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
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter((coach) =>
        Object.keys(this.activeFilters).some(
          (key) => this.activeFilters[key] && coach.areas.includes(key)
        )
      );
    },

    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    loadCoaches() {
      this.$store.dispatch('coaches/loadCoaches');
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
