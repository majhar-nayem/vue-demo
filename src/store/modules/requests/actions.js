export default {
   async contactCoach(context, payload){
        const data = {
            email : payload.email,
            message : payload.message
        }
       const res = await fetch(`https://majharul-islam-vue-app-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method : "POST",
            body : JSON.stringify(data)
        });

        const resData = await res.json();

        if(!res.ok){
            const error = new Error( resData.message || "Faild to send request!");
            throw error;
        }
        data.id = resData.name;

        context.commit('addRequest',data);
    },
    async loadRequest(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const res = await fetch(`https://majharul-islam-vue-app-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+ token)
        const resData = await res.json();

        if(!res.ok){
            const error = new Error( resData.message || "Faild to send request!");
            throw error;
        }
        const requests = [];

        for ( const key in resData){
            const request = {
                coachId : coachId,
                email : resData[key].email,
                message : resData[key].message
            }
            requests.push(request);
        }

        context.commit('setRequest',requests);
    }
}