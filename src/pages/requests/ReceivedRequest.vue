<template>
<div>
    <section>
        
        <base-dialog :show="!!error" title="An Error Occured!" @close="handleError">
        <p>{{ error }}</p>
        </base-dialog>
        <base-card>
        <header>
            <h1>Received Requests</h1>
        </header>
        <base-spinner v-if="isLoading">
        </base-spinner>
        <ul v-else-if="hasRequest">
            <request-item
            v-for="request in receivedRequests" :key="request.email"
            :email="request.email"
            :message="request.message"
            >
             </request-item>
        </ul>
        <h3 v-else>You haven't Received any Requests Yet!</h3>
        </base-card>
    </section>
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import BaseDialog from '../../components/UI/BaseDialog.vue';
export default {
    components : { RequestItem, BaseDialog },
    data(){
        return {
            isLoading :false,
            error : null
        }
    },
    computed : {
        receivedRequests(){
           return this.$store.getters['requests/requests'];
        },
        hasRequest(){
            return this.$store.getters['requests/hasRequest'];
        }
    },
    created(){
        this.loadRequest();
    },
    methods :{
        async loadRequest(){
            this.isLoading = true;
            try{
                await this.$store.dispatch('requests/loadRequest');
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

// <style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>