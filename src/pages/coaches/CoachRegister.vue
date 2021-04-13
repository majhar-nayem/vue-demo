<template>
<base-card>
  <coach-form @register-coach="registerCoach"></coach-form>
</base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
    components : { CoachForm },
    methods : {
        registerCoach(data){
            this.$store.dispatch('coaches/registerCoach', data);
            this.$router.replace('/coaches');
        }
    }
}
</script>