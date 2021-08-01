<template>
  <div>
    <div >        
      <v-data-table
        :headers="headers"
        :items="listaUsuariosFiltrada"
        disable-sort
        no-results-text="Nenhum resultado encontrado"
        no-data-text="Nenhum resultado encontrado"
        class="elevation-1 ma-5 mb-0"
        :loading="loading"
        loading-text="Carregando... Por favor, aguarde"
        :footer-props="{
          'showFirstLastPage': true,
          'itemsPerPageText': 'Itens por página:',
          'items-per-page-options': [10, 20, 30, 50],
          'pageText': '{0}-{1} de {2}'
        }"
        @page-count="pageCount = $event"
      >

        <template v-slot:top>
          <v-card-title class="title font-weight-bold grey--text text--darken-2">
            <v-col class="pa-0">
              <v-icon class="mr-2 mb-1">mdi-format-list-bulleted</v-icon> Contas
            </v-col>

            <v-col align="right">
              <v-btn color="primary" dark @click="listarContas()">
                <v-icon dark left>mdi-plus</v-icon> Adicionar Usuário
              </v-btn>
            </v-col>
          </v-card-title>
          
          <v-divider />

          <v-row class="mx-2">
            <v-col cols="5">
              <v-select
                v-model="filtrarPor"
                :items="tiposFiltro"
                return-object
                multiple
                placeholder="Selecione"
                label="Filtrar por"
                :menu-props="{offsetY: true}"
                outlined
                dense
                hide-details
                @change="mudarFiltros(false)"
              />
            </v-col>

            <v-col v-if="filtrarPor.length > 0" cols="1" class="mt-2">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon color="teal" v-on="on" @click="limparFiltros(true)">
                    <v-icon>mdi-broom</v-icon>
                  </v-btn>
                </template>
                <span>Limpar Filtros</span>
              </v-tooltip>
            </v-col>
          </v-row>

          <v-row class="mx-2">
            <v-col v-if="tiposFiltro[0].ativo" cols="3">
              <v-text-field
                v-model="filtros.nome"
                label="Nome"
                placeholder="Digite"
                outlined
                dense
                hide-details
                autocomplete="off"
              />
            </v-col>  

            <v-col v-if="tiposFiltro[1].ativo" cols="3">
              <v-text-field
                v-model="filtros.nomeInstituicao"
                label="Nome da Instituicao"
                placeholder="Digite"
                outlined
                dense
                hide-details
                autocomplete="off"
              />
            </v-col>

            <v-col v-if="tiposFiltro[2].ativo" cols="3">
              <v-text-field
                v-model="filtros.cpf"
                v-mask="'###.###.###-##'"
                label="CPF"
                placeholder="Digite"
                outlined
                dense
                hide-details
                autocomplete="off"
              />
            </v-col>

            <v-col v-if="tiposFiltro[3].ativo" cols="2">
              <v-select
                v-model="filtros.status"
                :items="[{ value: 'ATIVOS', text: 'Ativos' }, { value: 'INATIVOS', text: 'Inativos' }]"
                label="Status"
                placeholder="Digite"
                outlined
                dense
                hide-details
                autocomplete="off"
              />
            </v-col>

            
            <!-- <v-btn v-if="filtrarPor.length > 0" color="primary" class="ml-3 mt-3 mb-3" dark @click="pesquisar()"> 
              <v-icon dark left>mdi-magnify</v-icon> Pesquisar
            </v-btn> -->

          </v-row>
          <v-divider />

        </template>

        <template v-slot:item.nome="{item}">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.nome.length > 20 ? item.nome.slice(0, 20)+'...' : item.nome }}</span>
            </template>
            <span>{{ item.nome }}</span>
          </v-tooltip>
        </template>
        
        <template v-slot:item.nomeInstituicao="{item}">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.nomeInstituicao.length > 20 ? item.nomeInstituicao.slice(0, 20)+'...' : item.nomeInstituicao }}</span>
            </template>
            <span>{{ item.nomeInstituicao }}</span>
          </v-tooltip>
        </template>

        <template v-slot:item.endereco="{item}">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.endereco.length > 20 ? item.endereco.slice(0, 20)+'...' : item.endereco }}</span>
            </template>
            <span>{{ item.endereco }}</span>
          </v-tooltip>
        </template>

        <template v-slot:item.status="{item}">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon :color="(item.status) ? 'green' : 'red'" v-on="on">mdi-circle</v-icon>
            </template>
            <span>{{ (item.status ? 'Ativo' : 'Desativado') }}</span>
          </v-tooltip>
        </template>

        <template v-slot:item.action="{item}">
          <v-tooltip bottom>
            <template v-if="item.username !== perfilUsuario.preferred_username" v-slot:activator="{on}">
              <v-btn text icon color="primary" v-on="on" @click="editar(item.id)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-if="item.username !== perfilUsuario.preferred_username" v-slot:activator="{on}">
              <v-btn text icon color="red darken-4" v-on="on" @click="excluirDialog(item.username, item.id)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Excluir</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </div>

   
  </div>
</template>

<script>

export default {
  data: () => ({
    contas: null,

    perfilUsuario: '',
  
    allUsers: [], // Uso essa lista para armazenar TODAS as instituicoes...
    users: [], // Uso essa lista para armazenar as instituicoes FILTRADAS (por tipo) (Essa que é mostrada)
    mostrarExcluirDialog: false,
    mensagemExclusao: '',
    idASerExcluido: '',
    truncate: [],
    snackbar: false, // Mostra/Esconde Snackbar
    snackbarErro: false, // Indica se o snackbar é erro ou não
    snackbarText: '', // Texto do Snackbar
    variavelTeste: '',

    mostrarFormulario: false,
    idUsuarioASerEditado: null,
    
    loading: true,
    totalElements: 0, // Quantidade totais de itens dessa entidade
    itemsPerPage: 10,
    pageCount: 0,
    options: {
      page: 1
    },

    // FILTROS
    filtrarPor: [],
    tiposFiltro: [
      { text: 'Nome', value: 'nome', ativo: false },
      { text: 'Nome da Instituicao', value: 'nomeInstituicao', ativo: false },
      { text: 'CPF', value: 'cpf', ativo: false },
      { text: 'Status', value: 'status', ativo: false }
    ],

    filtros: {
      nome: null,
      nomeInstituicao: null,
      cpf: null,
      status: null
    },
    // End Filtros

    idGroupIscm: '',

    headers: [
      { text: 'Nome', value: 'nome' },
      { text: 'Usuário', value: 'username' },
      { text: 'CPF', value: 'cpf' },
      { text: 'Instituição', value: 'nomeInstituicao' },
      { text: 'Base/Endereço', value: 'endereco' },
      { text: 'Status', value: 'status' },
      // { text: 'Email', value: 'email' },
      // { text: 'Matricula', value: 'matricula' },
      // { text: 'Data de criação', value: 'dtCriacao' },
      { text: 'Ações', value: 'action', sortable: false }
    ]
  }),

  computed: {
    // Faz a filtragem em tempo real
    listaUsuariosFiltrada() {
      if (this.users && this.users.length > 0) {
        return this.users.filter(filt => {
          return (this.filtros.nome) 
            ? filt.nome.toLowerCase().includes(this.filtros.nome.toLowerCase())
            : true && // TRUE faz o bypass do filtro
            (this.filtros.nomeInstituicao) 
              ? filt.nomeInstituicao.toLowerCase().includes(this.filtros.nomeInstituicao.toLowerCase()) 
              : true &&
              (this.filtros.cpf) 
                ? filt.cpf.includes(this.filtros.cpf) 
                : true &&
                (this.filtros.status) 
                  ? (this.filtros.status == 'ATIVOS')
                    ? filt.status == true 
                    : filt.status == false
                  : true
        })
      } else {
        return []
      }
    }
  },

  // watch: {
  //   options: {
  //     handler() {
  //       this.listarUsuarios()
  //     },
  //     deep: true
  //   }
  // },

  mounted() {
    // this.listarContas()
    // this.initialize()
  },

  methods: {
    // listarContas(){
    // this.$servicos.http['clientes'].listar()
    // .then(res=>{
    //   console.log("resposta",res.data)

    // })
    // .catch(erro=>{
    //   console.log("ERRO:",erro);
    // })
    // },
    // initialize() {
    //   this.carregarDadosUsuario()
    //   this.listarUsuarios()
    // },

    carregarDadosUsuario() {
      // Recupera os dados do usupario logado
    },

    // Modificado em 13/11/20 - Raniel
    // Modificado em 12/04/20 - Raniel (Mudar abordagem de listagem, para trazer tudo e filtrar no front.)
  }
}
</script>

<style>
tbody tr td:nth-child(2) {
  max-width: 150px !important;
}
</style>

