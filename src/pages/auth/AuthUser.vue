<template>
    <div>
      <base-dialog :show="!!error" title="An Error Occurred" @close="handleError">
      <p>{{ error }}</p>
      </base-dialog>
      <base-dialog fixed title="Authenticating.." :show="isLoading">
        <base-spinner></base-spinner>
      </base-dialog>
        <base-card>
        <form @submit.prevent="submitForm">
        <h2>{{ mode}} As User</h2>
        <div class="form-control">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model.trim="password">
        </div>
        <div>
            <p v-if="!isValid" class="errors">Enter a valid email address and password of atleast 6 character long.</p>
        </div>
        <base-button>{{ buttonText }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{ switchModeText }}</base-button>
         </form>
        </base-card>
    </div>
</template>
<script>
import BaseDialog from '../../components/UI/BaseDialog.vue';
export default {
  components: { BaseDialog },
    data(){
        return {
            email : '',
            password : '',
            isValid : true,
            mode : 'login',
            modeText : 'Login',
            switchText : 'Signup Instead',
            isLoading : false,
            error : ''
        }
    },
    computed : {
      buttonText(){
          if(this.mode === 'signup'){
            return 'Sign Up';
          }else{
            return 'Login';
          }
      },
      switchModeText(){
         if(this.mode === 'login'){
            return 'Sign Up Instead';
          }else{
            return 'Login Instead';
          }
      }
    },
    methods : {
    async submitForm(){
      this.isValid = true;
      if(this.email === '' ||
       this.password.length < 6 ||
       !this.email.includes('@')){
         this.isValid = false;
       }

       this.isLoading = true;

        const formData = {
            email : this.email,
            password : this.password
        }
          try{
        if(this.mode === 'login'){
          await this.$store.dispatch('login', {formData});
        }else{
         await this.$store.dispatch('signup', {formData});
          }
          this.$router.replace('/coaches');
          }catch(error){
            this.error = error.message || "Faild to LoggedIn"
          }
        this.isLoading = false;
    },
    switchMode(){
      if(this.mode === 'signup'){
            this.mode = 'login';
          }else{
            this.mode = 'signup';
          }
    },
    handleError(){
      this.error = '';
    },
    }

}
</script>
<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}
h2 {
    text-align: center;
    color : blue;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.5rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>