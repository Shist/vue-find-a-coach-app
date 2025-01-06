<template>
  <div v-if="selectedCoach">
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton v-if="isContactBtnVisible" link :to="contactLink">
            Contact
          </BaseButton>
        </header>
        <router-view></router-view>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></BaseBadge>
        <p>{{ description }}</p>
      </BaseCard>
    </section>
  </div>
  <h2 v-else class="no-coach-headline">No coach with such ID found...</h2>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selectedCoach: null,
    };
  },

  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },

    areas() {
      return this.selectedCoach.areas;
    },

    rate() {
      return this.selectedCoach.hourlyRate;
    },

    description() {
      return this.selectedCoach.description;
    },

    contactLink() {
      return `${this.$route.path}/contact`;
    },

    isContactBtnVisible() {
      return !this.$route.path.endsWith('/contact');
    },
  },

  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

<style scoped>
.no-coach-headline {
  text-align: center;
}
</style>
