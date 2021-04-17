
let timer;
export default {
    async login(context, payload){
        return context.dispatch('auth',{
            ...payload,
          mode : 'login'
        });
    },
    async signup(context, payload){
          return context.dispatch('auth',{
              ...payload.formData,
            mode : 'signup'
          });
    },

    async auth(context,payload){
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        if(mode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        }
        const res =  await fetch(url,{
             method : 'POST',
             body : JSON.stringify({
                 email : payload.formData.email,
                 password : payload.formData.password,
                 returnSecureToken : true
             })
         });

         const resData = await res.json();

         if(!res.ok){
             console.log(resData);
             const error = new Error(res.message || "Authentication Failed!");
             throw error;
         }
         const expiresIn = +resData.expiresIn *1000;
         const expirationDate = new Date().getTime() + expiresIn;

         localStorage.setItem('token', resData.idToken);
         localStorage.setItem('userId', resData.localId);
         localStorage.setItem('expiresIn', expirationDate);

        timer = setTimeout(function(){
             context.dispatch('autoLogout');
         },expiresIn);

         context.commit('setUser', {
             token : resData.idToken,
             userId : resData.localId,
         });
    },
    tryLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationTime = localStorage.getItem('expiresIn');

        const expiresIn = +expirationTime - new Date().getTime();
        if(expiresIn < 0){
            return;
        }
        timer = setTimeout(function(){
            context.dispatch('autoLogout')
        },expiresIn);

        if(token && userId){
        context.commit('setUser', {
            token : token,
            userId : userId,
        });
    }
    },
    logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiresIn');

        clearTimeout(timer);

        context.commit('setUser', {
            token : null,
            userId : null,
        });   
    },
    autoLogout(context){
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
}