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
            :rules="[rules.required, rules.counter]"
            outlined
            shaped
          ></v-text-field>
          <v-text-field
            v-model="last"
            label="Nom"
            :rules="[rules.required, rules.counter]"
            filled
            shaped
          ></v-text-field>
          <v-text-field
            v-model="firm"
            label="Entreprise"
            :rules="[rules.required, rules.counter]"
            filled
            shaped
          ></v-text-field>
          <div class="text-center">
            <v-btn color="#35bfb9" @click="validate" >Commencer le test</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  import PouchDB from "pouchdb";
  const db = new PouchDB('questionnaire')

 export default {
  name: 'login',
  data(){
    return {
      first: "",
      last: "",
      firm: "",
      rules: {
          required: value => !!value || 'Champ Requis.',
          counter: value => value.length <= 50 || 'Max 20 characters',
      },
    }
  },
  methods: {
    validate () {
      // if (this.$refs.form.validate()) {
        // this.snackbar = true
        // var id = uuid()

        db.post({
          firstname: this.first,
          lastname: this.last,
          company: this.firm
        }).then((doc) => {
          console.warn(doc)
          this.$router.push("/questionnaire/" + doc.id)
        })
      // }
    }
  }
}
</script>