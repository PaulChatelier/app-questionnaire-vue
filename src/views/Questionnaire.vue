<template>
<div>
  <div>
    <v-toolbar
      dark
      prominent
      src="http://i.stack.imgur.com/vhoa0.jpg"
      height="100px"
    >
      <v-toolbar-title>Questionnaire</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/plus_questionnaire">
        <v-icon>mdi-wrench</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
  <div>
    <v-stepper v-model="e1" id="login">
      <v-stepper-header>
        <v-stepper-step v-for="(data,index) in myJson.question" :key="data.question"  :complete="e1 > index+1" :step="index+1" ></v-stepper-step>

      <v-divider></v-divider>
     </v-stepper-header>

    <v-stepper-items >
      <v-stepper-content v-for="(question,index) in myJson.question" :key="question.question" :step="index+1" >
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
          <v-card-text>
            {{question.texte}}
              <v-checkbox v-model="reponse.bool" v-for="reponse in question.reponse" :key="reponse.reponse" :label="reponse.reponse" height="0px"></v-checkbox>
          </v-card-text>
        </v-card>

        <v-btn v-if="e1<10"
          color="primary"
          @click="e1 = e1+1"
        >
          Continue
        </v-btn>

<div v-if="e1==10" class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Envoyer
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Validation
        </v-card-title>

        <v-card-text>
          Etes-vous sûr d'envoyer vos réponses ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="response_form()"
          >
            Oui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </div>
  </div>
</template>

<script>

import json from '../questionnaire.json'
import PouchDB from "pouchdb";
const db = new PouchDB('questionnaire')

export default {
  name: 'questionnaire',
  data () {
    return {
      myJson: JSON.parse(JSON.stringify(json)),
      e1: 1,
      dialog: false
    }
  },
    mounted () {
    console.log(this.myJson)
    },

    methods: {
    response_form () {

      this.dialog = false
      const user_doc_id = this.$route.params.user_doc_id
      
      db.get(user_doc_id).then(user_doc => {

        user_doc.questions = this.myJson.question

        db.put(user_doc).then( () => {

          let maxscore = 0
          let score = 0

          this.myJson.question.forEach(question => {

            question.reponse.forEach(reponse => {

              if(reponse.true_response) maxscore += 1

              if(reponse.bool === reponse.true_response){

                if(reponse.true_response === true) score += 1

              }else{

                score -= 1

              }
              
            });

          });

          alert("Votre score est : " + score/maxscore*20 + "/20")
          this.$router.push('/')
        })

      })

    }

  }
}

</script>

<style>

</style>
