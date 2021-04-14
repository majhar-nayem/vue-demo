<template>
    <section>
        <base-card>
        <header>
            <h1>Received Requests</h1>
        </header>
        <ul v-if="hasRequest">
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
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
    components : { RequestItem },
    computed : {
        receivedRequests(){
           return this.$store.getters['requests/requests'];
        },
        hasRequest(){
            return this.$store.getters['requests/hasRequest'];
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