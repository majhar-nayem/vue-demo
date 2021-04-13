<template>
  <form @submit.prevent="submitForm">
      <div class="form-control" :class="{invalid : !firstName.isValid}">
           <label for="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" v-model.trim="firstName.val" @blur="clearError('firstName')">
         <p v-if="!firstName.isValid">First Name can't be Empty</p>
      </div>
            <div class="form-control" :class="{invalid : !lastName.isValid}">
                 <label for="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" v-model.trim="lastName.val" @blur="clearError('lastName')">
          <p v-if="!lastName.isValid">Last Name Can't be Empty </p>
      </div>
            <div class="form-control" :class="{invalid : !description.isValid}">
                <label for="description">Description</label>
          <textarea id="description" rows="5" v-model.trim="description.val" @blur="clearError('description')"></textarea>
           <p v-if="!areas.isValid"> A short Description is Required </p>
      </div>
            <div class="form-control" :class="{invalid : !rate.isValid}">
                 <label for="rate">Hourly Rate</label>
          <input type="number" name="rate" id="rate" v-model.number="rate.val" @blur="clearError('rate')">
          <p v-if="!rate.isValid">Hourly Rate must be more than 0</p>
      </div>
      <div class="form-control" :class="{invalid : !areas.isValid}">
          <h3>Area of Expertise?</h3>
          <div>
              <input type="checkbox" value="frontend" id="frontend" v-model="areas.val" @blur="clearError('areas')">
              <label for="frontend">Frontend Development</label>
          </div>
                    <div>
              <input type="checkbox" value="backend" id="backend" v-model="areas.val" @blur="clearError('areas')">
              <label for="backend">Backend Development</label>
          </div>
                    <div>
              <input type="checkbox" value="career" id="career" v-model="areas.val" @blur="clearError('areas')">
              <label for="career">Career Consultation</label>
          </div>
          <p v-if="!areas.isValid">Atleast one Expertise is required </p>
      </div>
      <p v-if="!isFormValid">Please Fixed the above error and submit again </p>
      <base-button> Register </base-button>
  </form>
</template>

<script>
export default {
    emits : ['register-coach'],
    data(){
        return{
                id : 'c3',
                firstName :{
                    val : '',
                    isValid : true
                },
                lastName : {
                    val : '',
                    isValid : true
                },
                rate  : {
                    val : null,
                    isValid : true
                },
                description : {
                    val : '',
                    isValid : true
                },
                areas  : {
                    val : [],
                    isValid : true
                },
                isFormValid : true
            };
    },
    methods : {
        validateForm(){
            this.isFormValid = true;
            if(this.firstName.val === ''){
                this.firstName.isValid = false;
                this.isFormValid = false;
            }
            if(this.lastName.val === ''){
                this.lastName.isValid = false;
                this.isFormValid = false;
            }
            if(this.description.val === ''){
                this.description.isValid = false;
                this.isFormValid = false;
            }
            if(!this.rate.val || this.rate.val < 0){
                this.rate.isValid = false;
                this.isFormValid = false;
            }
            if(this.areas.val.length === 0){
                this.areas.isValid = false;
                this.isFormValid = false;
            }
        },
        submitForm(){
            this.validateForm();
            if(!this.isFormValid){
                return;
            }
            const data = {
                firstName : this.firstName.val,
                lastName : this.lastName.val,
                description : this.description.val,
                hourlyRate : this.rate.val,
                areas : this.areas.val
            }
            this.$emit('register-coach', data);
            console.log("Event Emited!");
        },
        clearError(input){
            this[input].isValid = true;
        }
    }
}
</script>

<style>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input[type='text'],
input[type='number'] {
    height: 2.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>