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
 <v-container>
      <v-row justify="center">
        <v-col :cols="12" lg="6" sm="6">
          <v-text-field
            v-model="first"
            label="Question"
          ></v-text-field>
          <v-text-field
            v-for="(listreponses,index) in listreponse" :key="listreponses.index" :step="index"
            v-model="last"
            label="Reponse"
          ></v-text-field>
          <div class="text-center">
            <v-btn @click="ajoutRep" style="margin-left:-10px">Ajout d'une reponse </v-btn>
            <v-btn color="#35bfb9" to="/questionnaire" style="margin-left:10px">Nouveau questionnaire</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      listreponse: [],
      last: ''
    }
  },
  methods: {
    ajoutRep: function () {
      this.listreponse.push(this.last)
    }
  }
}
</script>
<style>

</style>
