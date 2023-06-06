<script setup lang="ts">
import { reactive } from 'vue'
import { useNinjasStore } from '../../stores/ninjas'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const ninjaStore = useNinjasStore()

interface State {
  firstName: string
  lastName: string
  seniority: number
  stack: string[]
  description: string
  availabilityDate: string
  isInMission: boolean
  devStack: string[]
}

const state: State = reactive({
  firstName: '',
  lastName: '',
  seniority: 0,
  stack: [
    'Node.js',
    'Vue.js',
    'Angular',
    'Python',
    'React',
    'Kafka',
    'Java',
    'C#',
    'Ruby',
    'Swift',
    'PHP',
    'JavaScript',
    'C++'
  ],
  description: '',
  availabilityDate: '',
  isInMission: false,
  devStack: [] // Array<string>
})

const rules = {
  firstName: { required }, // Matches state.firstName
  lastName: { required }, // Matches state.lastName
  seniority: { required },
  stack: { required, minLength: minLength(1) },
  description: { required, minLength: minLength(20) },
  availabilityDate: { required },
  isInMission: { required }
}

const v$ = useVuelidate(rules, state)

function setDevStack(event: Event) {
  const { id, checked } = event.target as HTMLInputElement
  if (checked) {
    state.devStack.push(id)
  } else {
    const index = state.devStack.findIndex((techno) => techno === id)
    state.devStack.splice(index, 1)
  }
}

function isActive(techno: string) {
  return state.devStack.includes(techno)
}

async function submitForm() {
  const isFormCorrect = true //await v$.$validate()

  if (isFormCorrect) {
    const formData = {
      ...state
    }

    const API_URL = import.meta.env.VITE_BASE_URL
    ninjaStore.registerNinja(formData, API_URL)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ error: v$.firstName.$error }">
      <label for="firstname">Prénom</label>
      <input type="text" id="firstname" v-model.trim="state.firstName" />
      <p v-if="v$.firstName.$error">Veuillez entrez un prénom</p>
    </div>
    <div class="form-control" :class="{ error: v$.lastName.$error }">
      <label for="firstname">Nom</label>
      <input type="text" id="lastname" v-model.trim="state.lastName" />
      <p v-if="v$.lastName.$error">Veuillez entrez un nom</p>
    </div>
    <div class="form-control" :class="{ error: v$.description.$error }">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="state.description"></textarea>
      <p v-if="v$.description.$error">Veuillez entrez une description (minimum 20 caractères)</p>
    </div>
    <div class="form-control" :class="{ error: v$.seniority.$error }">
      <label for="seniority">Ancienneté (mois)</label>
      <input type="number" id="seniority" v-model="state.seniority" />
      <p v-if="v$.seniority.$error">Veuillez entrez l'ancienneté en mois (nombre entier positif)</p>
    </div>
    <div class="form-control" :class="{ error: v$.availabilityDate.$error }">
      <label for="availabilityDate">Date de disponibilité</label>
      <input type="date" id="availabilityDate" v-model="state.availabilityDate" />
      <p v-if="v$.availabilityDate.$error">Veuillez entrez votre disponibilité</p>
    </div>
    <div class="form-control" :class="{ error: v$.isInMission.$error }">
      <label for="isInMission">Est en mission?</label>
      <input type="checkbox" id="isInMission" v-model="state.isInMission" />
      <p v-if="v$.isInMission.$error">Veuillez indiquez si le ninja est en mission</p>
    </div>
    <div class="form-control" :class="{ error: v$.stack.$error }">
      <h3>Stack Technique</h3>
      <template v-for="techno in state.stack" :key="techno">
        <span class="filter-option" :class="{ active: isActive(techno) }">
          <input type="checkbox" :id="techno" @change="setDevStack" />
          <label :for="techno">{{ techno }}</label>
        </span>
      </template>
      <p v-if="v$.stack.$error">Veuillez choisir au moins une technologie</p>
      <base-button id="submit-btn">Enregistrer</base-button>
    </div>
  </form>
</template>

<style scoped>
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

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
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

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}

#submit-btn {
  margin-top: 10px;
}

.error {
  color: red;
}

.error input,
.error textarea {
  border: 1px solid rgb(199, 199, 199);
  border-color: red;
}
</style>
