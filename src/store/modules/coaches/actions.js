export default {
   async registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const token = context.rootGetters.token;
       const res = await fetch(`https://majharul-islam-vue-app-default-rtdb.firebaseio.com/caoches/${userId}.json?auth=` + token, {
            method : 'PUT',
            body : JSON.stringify(data)
        })
      //  const coachData = await res.json();

        if(!res.ok){
            //
        }

        context.commit('addData', {
            ...data,
            id : userId
        });
    },
    async loadCoaches(context, payload){
        if(!payload.forceUpdate && !context.getters.shouldUpdate){
            return;
        }
        const res = await fetch(`https://majharul-islam-vue-app-default-rtdb.firebaseio.com/caoches.json`);
        const data = await res.json();

        const coaches = [];

        for (const key in data){
            const coach = {
                id : key,
                firstName : data[key].firstName,
                lastName : data[key].lastName,
                description : data[key].description,
                hourlyRate : data[key].hourlyRate,
                areas : data[key].areas
            }
            coaches.push(coach);
        }
        context.commit('setData', coaches);
        context.commit('setLastFetchTimeStamp');
    }
}