<template>
<div>
  <div>
    <v-toolbar
      dark
      prominent
      src="http://i.stack.imgur.com/vhoa0.jpg"
      height="100px"
    >
      <v-toolbar-title >Questionnaire</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
  <div>
       <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step v-for="(r,key) in rs" :key="key"  :complete="e1 > 1" step="1">1</v-stepper-step>

      <v-divider></v-divider>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </div>
  </div>
</template>

<script>

import json from '../questionnaire.json'

export default {
  name: 'login',
  data(){
      return{
          myJson: json
      }
  }
}

</script>

<style>

</style>
