<template>
  <v-form>
    <v-container>
      <v-row align="center" justify="center">
        <v-img
          src="https://www.aplicit.com/wp-content/uploads/2015/11/ImageQuestionnaireblanc2.jpg"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="300"
          max-height="-300"
          style="margin-bottom : 15px;"
        ></v-img>
      </v-row>
      <v-row justify="center">
        <v-col :cols="12" lg="6" sm="6">
          <!-- Champ Prénom -->
          <v-text-field
            v-model="pc_first"
            label="Prenom"
            :rules="[rules.required, rules.counter]"
            outlined
            shaped
          ></v-text-field>
          <!-- Champ Nom -->
          <v-text-field
            v-model="pc_last"
            label="Nom"
            :rules="[rules.required, rules.counter]"
            filled
            shaped
          ></v-text-field>
          <!-- Champ Entreprise -->
          <v-text-field
            v-model="pc_firm"
            label="Entreprise"
            :rules="[rules.required, rules.counter]"
            filled
            shaped
          ></v-text-field>
          <!-- Bouton pour validation et événement pc_validate -->
          <div class="text-center">
            <v-btn color="#35bfb9" @click="pc_validate">Commencer le test</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
// import et const permettant le lancement de PouchDB et son constructeur
import PouchDB from "pouchdb";
const db = new PouchDB("questionnaire");

export default {
  name: "login",
  data() {
    return {
      // Récupération du content des champs remplis par l'utilisateur
      pc_first: "",
      pc_last: "",
      pc_firm: "",
      // Permet d'afficher le champs en rouge si aucunes informations saisies
      rules: {
        required: value => !!value || "Champ Requis.",
        counter: value => value.length <= 50 || "Max 20 characters"
      }
    };
  },
  methods: {
    // Fonction Validation permettant l'envoie des données à PouchDB
    pc_validate() {
      db.post({
        pc_firstname: this.pc_first,
        pc_lastname: this.pc_last,
        pc_company: this.pc_firm
      }).then(doc => {
        console.warn(doc);
        this.$router.push("/questionnaire/" + doc.id);
      });
    }
  }
};
</script>