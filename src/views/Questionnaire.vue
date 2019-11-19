<template>
  <div>
    <div>
      <!-- Toolbar avec image -->
      <v-toolbar dark prominent src="http://i.stack.imgur.com/vhoa0.jpg" height="100px">
        <v-toolbar-title>Questionnaire</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon to="/plus_questionnaire">
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <div>
      <!-- Affichage du nb de question pour une bonne navigation  -->
      <v-stepper v-model="e1" id="login">
        <v-stepper-header>
          <v-stepper-step
            v-for="(data,index) in myJson.question"
            :key="data.question"
            :complete="e1 > index+1"
            :step="index+1"
          ></v-stepper-step>

          <v-divider></v-divider>
        </v-stepper-header>

        <!-- Génération des question extraites du JSON  -->
        <v-stepper-items>
          <v-stepper-content
            v-for="(question,index) in myJson.question"
            :key="question.question"
            :step="index+1"
          >
            <v-card class="mb-12" color="grey lighten-1" height="200px">
              <!-- Génération des reponses extraites du JSON  -->
              <v-card-text>
                {{question.texte}}
                <v-checkbox
                  v-model="reponse.bool"
                  v-for="reponse in question.reponse"
                  :key="reponse.reponse"
                  :label="reponse.reponse"
                  height="0px"
                ></v-checkbox>
              </v-card-text>
            </v-card>

            <!-- Bouton continue t'en qu'il y a < de 10 questions -->
            <v-btn v-if="e1<10" color="primary" @click="e1 = e1+1">Continue</v-btn>

            <!-- Changement lorsque nous somme à 10 itérations -->
            <div v-if="e1==10" class="text-center">
              <v-dialog v-model="dialog" width="500">
                <!-- Bouton envoyer  -->
                <template v-slot:activator="{ on }">
                  <v-btn color="red lighten-2" dark v-on="on">Envoyer</v-btn>
                </template>

                <!-- Bouton Valider -->
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Validation</v-card-title>

                  <!-- Vérification choix utilisateur pour envoie -->
                  <v-card-text>Etes-vous sûr d'envoyer vos réponses ?</v-card-text>

                  <v-divider></v-divider>

                  <!-- Click sur événement bouton oui et appelle de fonction response_form -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="response_form()">Oui</v-btn>
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
// Divers imports comme pouchDB et constructeur de celui ci
import json from "../questionnaire.json";
import PouchDB from "pouchdb";
const db = new PouchDB("questionnaire");

export default {
  name: "questionnaire",
  data() {
    return {
      // Permet la réinitialisation des choix sur formulaire pour prochaines utilisateurs
      myJson: JSON.parse(JSON.stringify(json)),
      e1: 1,
      dialog: false
    };
  },
  mounted() {
    console.log(this.myJson);
  },

  methods: {
    // Fonction permettant de mettre en BDD les résultats de l'uilisateurs et aussi permet de calculer son résultat
    response_form() {
      // Permet de mettre en BDD résultat
      this.dialog = false;
      const user_doc_id = this.$route.params.user_doc_id;

      db.get(user_doc_id).then(user_doc => {
        user_doc.questions = this.myJson.question;

        db.put(user_doc).then(() => {
          // let des variables scores
          let maxscore = 0;
          let score = 0;

          this.myJson.question.forEach(question => {
            question.reponse.forEach(reponse => {
              // Calcul des scores
              if (reponse.true_response) maxscore += 1;

              if (reponse.bool === reponse.true_response) {
                if (reponse.true_response === true) score += 1;
              } else {
                score -= 1;
              }
            });
          });

          // Affichage du score
          alert("Votre score est : " + (score / maxscore) * 20 + "/20");
          // Retour à la page de Login
          this.$router.push("/");
        });
      });
    }
  }
};
</script>

<style>
</style>
