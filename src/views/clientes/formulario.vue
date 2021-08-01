<template>
  <div>

    <v-dialog v-model="show" scrollable max-width="50%" persistent>
      <v-card >
        <div class="ma-5">
          <v-card-title class="title font-weight-bold font-weight-bold grey--text text--darken-2">
            <v-icon class="mr-3">mdi-file-document-outline</v-icon>
            <span v-if="!modoEdicao">Cadastro de Cliente</span> 
            <span v-if="modoEdicao">Edição de Cliente</span> 
          </v-card-title>
          <v-divider />
          <v-form
            class="mt-5"
            ref="form"
            v-model="valid"
          >
          <v-row>
            <v-col cols="4">
              <v-text-field
              v-model="usuario.nome"
              :rules="nameRules"
              outlined
              dense
              placeholder="Digite"
              label="Nome"
              required
            ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
              v-model="usuario.cpf"
              v-mask="'###.###.###-##'"
              :rules="cpfRules"
              outlined
              dense
              label="CPF"
              placeholder="Digite"
              required
            ></v-text-field>
            </v-col> 
            <v-col cols="4">
              <v-text-field
              v-model="usuario.email"
              outlined
              dense
              :rules="emailRules"
              label="E-mail"
              placeholder="Digite"
              required
            ></v-text-field>
            </v-col> 
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
            <v-textarea
              v-model="usuario.observacoes"
              name="input-7-1"
              label="Observações"
              outlined
              dense
            ></v-textarea>
            </v-col>
            <v-spacer />
            <v-col cols="2">
              <v-switch
                v-model="usuario.ativo"
                label="Status"
              ></v-switch>
            </v-col>
          </v-row>
            

            
    <!-- 
            <v-select
              v-model="select"
              outlined
              dense
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select>

            <v-checkbox
              v-model="checkbox"
              outlined
                    dense
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn> -->
        <v-card-actions>
          <!-- JOGA TUDO PRA DIREITA -->
          <v-spacer />
            <v-btn
              color="success"
              class="mr-4"
              :loading="loading"
              :disabled="loading"
              @click="cadastrarCliente()"
            >
              Confirmar
            </v-btn>
            <v-btn
              color="error"
              class="mr-4"
              @click="fechar()"
            >
              Fechar
            </v-btn>
        </v-card-actions>

            <!-- <v-btn
              color="warning"
              @click="resetValidation"
            >
              Reset Validation
            </v-btn> -->
          </v-form>
        </div>
      </v-card>
      <!-- Overlay -->
      <!-- <v-overlay z-index="9999" :value="mostrar">
        <div class="text-center">
          <v-progress-circular :size="50" color="primary" indeterminate />
        </div>
      </v-overlay> -->

      <!-- <v-card>
          <v-card-title primary-title>
              <div>
                  <h3 class="headline mb-0">headline</h3>
                  <div>description</div>
              </div>
          </v-card-title>
          <v-card-actions>
              <v-btn text color="primary" @click="fechar()">fechar</v-btn>
              <v-btn text color="primary">text</v-btn>
          </v-card-actions>
      </v-card> -->

    </v-dialog>
    <SnackBar 
      :show="mostrarSnack"
      :tipo="tipoMenssagem"
      :texto="menssagem"
      @fecharSnack="()=>{ this.mostrarSnack = false}"
    />
  </div>

</template>

<script>

import { cpf } from 'cpf-cnpj-validator'; 
import {mask} from 'vue-the-mask'
import SnackBar from '@/components/SnackController.vue'

export default {
  directives: {mask},
  components: {
    SnackBar
  },  
  props: {
    mostrar: {
      type: Boolean,
      default: false
    },
    idUsuario: {
      type: [Number, String],
      default: null
    },
  },

  data() {
    return {
        //snack
        mostrarSnack: false,
        tipoMenssagem: null,
        menssagem: '',
        //snack fim

        modoEdicao: false,
        loading: false,
        //dados de usuario
        emailRules: [
          v => !!v || 'E-mail é obrigatório',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail inválido'
        ],
        nameRules: [
          v => !!v || 'Campo Obrigatório'
        ],
        cpfRules: [
          v => !!v || 'CPF é Obrigatório',
          v => cpf.isValid(v) || 'CPF Inválido'
        ],
        valid: false,
        observacoes: '',
        usuario: {
          nome : '',
          email : '',
          cpf : '',
          observacoes : '',
          ativo: true
        },
    }
  },
  mounted(){
    console.log("COMPONENTE MONTADO");
  },
  created(){
    
    console.log("COMPONENTE CRIADO");
  },
  computed: {
    show: {
        get() {
        if(this.idUsuario != null){
            this.modoEdicao = true
            this.carregarCliente()
        }else{
          this.modoEdicao = false
        }
        console.log("entrou no show");
        return this.mostrar
        },
        set(val) {
            if (!val) {
                console.log("entrou no show");
                this.fechar()
            }
        }
    },
   
  },
//   whatch:{
//     mostrarObservador(mostrar){
//         if(mostrar){
//             this.show = true
//         }else{
//             this.show = false
//         }
//     }
//   },
  methods:{
    popup(txt,tipo){
      this.tipoMenssagem = tipo
      this.menssagem = txt
      this.mostrarSnack = true
    },
    fechar() {
    console.log("entrou no fechar");
    this.$refs.form.reset()
    this.$emit('fechar') // Evento que fecha o dialogo...
    },

    carregarCliente(){
    this.$servicos.http['clientes'].carregarPorId(this.idUsuario)
      .then(resposta=>{
          this.usuario = resposta.data
          this.usuario.cpf = cpf.format(this.usuario.cpf)
          console.log("USUARIO RETORNADO: ",this.usuario);
      })
      .catch(error=>{
          this.popup('Falha ao carregar lista de clientes','error')
          console.log("ERROR: ",error.response);
      })    
    },

    cadastrarCliente(){
      if(this.formValid()){
        this.loading = true
        if(this.modoEdicao){
          console.log("objeto enviado: ",this.usuario);
          this.$servicos.http['clientes'].editarCliente(this.usuario)
            .then(resposta=>{
              this.popup('Cliente editado com sucesso','success')
              console.log("REPOSTA: ",resposta.data);
              this.$emit('recarregar')
              this.fechar()
            })
            .catch(error=>{
              this.popup('Falha ao editar cliente','error')
              console.log("ERROR: ",error);
            })
            .finally(()=>{
              this.loading = false
            })
        }else{
          console.log("objeto enviado: ",this.usuario);
          this.$servicos.http['clientes'].cadastrarCliente(this.usuario)
            .then(resposta=>{
              this.popup('Cliente cadastrado com sucesso','success')
              console.log("REPOSTA: ",resposta.data);
              this.$emit('recarregar')
              this.fechar()
            })
            .catch(error=>{
              this.popup('Falha ao cadastrar cliente','error')
              console.log("ERROR: ",error);
            })
            .finally(()=>{
              this.loading = false
            })
          }
      }else{
        this.popup('Preencha todos os campos indicados corretamente','error')
      }

    },
    formValid(){
      return this.$refs.form.validate()
    }      
  },

} 
</script>

<style>

</style>
