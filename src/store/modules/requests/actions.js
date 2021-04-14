export default {
    contactCoach(context, payload){
        const data = {
            id : new Date().toISOString(),
            coachId : payload.coachId,
            email : payload.email,
            message : payload.message
        }
        context.commit('addRequest',data);
    }
}