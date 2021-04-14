<template>
    <section>
      <base-dialog :show="!!error" title="An Error Occured!" @close="handleError">
      <p>{{ error }}</p>
      </base-dialog>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
        <base-card>
        <div class="controls">
        <base-button mode="outline" @click="loadCoach">Load Coaches</base-button>
        <base-button link to="/register" v-if="!isLoading">Register As A Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
                 <coach-item
                 v-for="coach in filteredCoaches"
                 :key="coach.id"
                 :id="coach.id"
                 :firstName="coach.firstName"
                 :lastName="coach.lastName"
                 :rate="coach.hourlyRate"
                 :areas="coach.areas"
                 >
                 </coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseDialog from '../../components/UI/BaseDialog.vue';
export default {
    components : { CoachItem, CoachFilter, BaseDialog },
    data(){
      return {
        error : null,
        isLoading : false,
        activeFilters : {
          frontend :true,
          backend :true,
          career : true
        }
      };
    },
    computed : {
        filteredCoaches(){
            const coaches = this.$store.getters['coaches/coaches'];
           return coaches.filter(coach => {
              if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                return true;
              }
              if(this.activeFilters.backend && coach.areas.includes('backend')){
                return true;
              }
              if(this.activeFilters.career && coach.areas.includes('career')){
                return true;
              }
              return false;
            });
        },
        hasCoaches(){
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        }
    },
    created(){
      this.loadCoach();
    },
    methods : {
      setFilter(updatedFilters){
        this.activeFilters = updatedFilters;
      },

      async loadCoach(){
        this.isLoading = true;
        try{
        await this.$store.dispatch('coaches/loadCoaches');
        }catch(error){
          this.error = error.message || "Something Went Wrong!";
        }
        this.isLoading = false;
      },
      handleError(){
        this.error = null;
      }
    }
}
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