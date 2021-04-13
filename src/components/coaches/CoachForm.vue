<template>
  <form @submit.prevent="submitForm">
      <div class="form-control">
           <label for="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" v-model.trim="data.firstName">
         
      </div>
            <div class="form-control">
                 <label for="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" v-model.trim="data.lastName">
         
      </div>
            <div class="form-control">
                <label for="description">Description</label>
          <textarea id="description" rows="5" v-model.trim="data.description"></textarea>
          
      </div>
            <div class="form-control">
                 <label for="rate">Hourly Rate</label>
          <input type="number" name="rate" id="rate" v-model.number="rate">
         
      </div>
      <div class="form-control">
          <h3>Area of Expertise?</h3>
          <div>
              <input type="checkbox" value="frontend" id="frontend" v-model="data.areas">
              <label for="frontend">Frontend Development</label>
          </div>
                    <div>
              <input type="checkbox" value="backend" id="backend" v-model="data.areas">
              <label for="backend">Backend Development</label>
          </div>
                    <div>
              <input type="checkbox" value="career" id="career" v-model="data.areas">
              <label for="career">Career Consultation</label>
          </div>
      </div>
      <base-button> Register </base-button>
  </form>
</template>

<script>
export default {
    data(){
        return{
            data : {
                firstName : '',
                lastName : '',
                rate  : null,
                description : '',
                areas  : []
            }
        }
    },
    methods : {
        submitForm(){
            console.log(this.data);
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