<template>
    <v-snackbar
        v-model="mostrarSnack"
        :timeout="timeout"
        :color="tipo"
        :multi-line="true"
        top
    >
    <v-icon class="ma-2" small>{{iconeSnackbar}}</v-icon>{{texto}}<template v-slot:action> <v-btn text @click="fecharSnack()"> <v-icon class="mr-1" small>mdi-close</v-icon> </v-btn> </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        tipo: {
            type: String,
            default: 'Success'
        },
        timeout: {
            type: Number,
            default: 10000
        },

        texto: {
            type: String,
            default: 'Menssagem Genérica'
        }
    },
    data: () =>{
        return{

        }
    },

    computed:{
      mostrarSnack: {
          get(){
              return this.show
          },
          set(val) {
            if (!val) {
                console.log("entrou no show");
                this.fecharSnack()
            }
        }
      },
      iconeSnackbar() {
      return (this.tipo != 'Success') ? 'mdi-alert' : 'mdi-check'
    }
    },

    methods:{
        fecharSnack(){
            this.$emit('fecharSnack')
        }
    }

    
}
</script>