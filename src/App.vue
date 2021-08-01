<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  
  mounted(){
    // this.$axios.http['clientes'].listar()
  },
  methods:{
    funcao(){
      
    }
  }
};
</script>
