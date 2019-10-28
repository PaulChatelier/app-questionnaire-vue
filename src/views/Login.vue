<template>
<v-form>
    <v-container>
  <v-row align="center" justify="center">
    <v-img
      src="https://www.leptidigital.fr/wp-content/uploads/2016/09/outils-questionnaire-en-ligne.jpg"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
      style="margin-bottom : 15px;"
    ></v-img>
  </v-row>
      <v-row justify="center">
        <v-col :cols="12" lg="6" sm="6">
          <v-text-field
            v-model="first"
            label="Prenom"
            outlined
            shaped
          ></v-text-field>
          <v-text-field
            v-model="last"
            label="Nom"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            v-model="last"
            label="Entreprise"
            filled
            shaped
          ></v-text-field>
          <div class="text-center">
            <v-btn color="#35bfb9" to="/questionnaire" >Commencer le test</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import PouchDB from 'pouchdb'
export default {
  name: 'login',
  methods: {

  }
}

var db = new PouchDB('questionnaire')
db.put()
</script>
<style>

</style>
