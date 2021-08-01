<template>
    <div>
        <v-data-table
            :headers="headersClientes"
            :items="clientes"
            dense
            no-results-text="Nenhum resultado encontrado"
            no-data-text="Nenhum resultado encontrado"
            class="elevation-4 ma-15 mb-0"
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
                <v-icon class="mr-2 mb-1">mdi-format-list-bulleted</v-icon> Clientes
                </v-col>

                <v-col align="right">
                <v-btn color="primary" dark @click="adicionarCLiente()">
                    <v-icon dark left>mdi-plus</v-icon> Adicionar Cliente
                </v-btn>
                </v-col>
            </v-card-title>

            <!-- STATUS
            <template v-slot:_ativo="{item}">
                <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon :color="statusField(item).cor" v-on="on">mdi-circle</v-icon>
                </template>
                <span>{{ statusField(item).descricao }}</span>
                </v-tooltip>
            </template> -->
    <!--           
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
                </v-col> -->

                
                <!-- <v-btn v-if="filtrarPor.length > 0" color="primary" class="ml-3 mt-3 mb-3" dark @click="pesquisar()"> 
                <v-icon dark left>mdi-magnify</v-icon> Pesquisar
                </v-btn> -->

            <!-- </v-row> -->
            </template>
            <template v-slot:item.ativo="{item}">
                <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon :color="statusField(item.ativo).cor" v-on="on">mdi-circle</v-icon>
                </template>
                <span>{{ statusField(item.ativo).descricao }}</span>
                </v-tooltip>
            </template>

            <template v-slot:item.acoes="{item}">
                <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on" @click="editarCliente(item.id)" >mdi-pencil</v-icon>
                </template>
                    <span>Editar</span>
                </v-tooltip>
            </template>

            <v-divider />
        </v-data-table>

        <!-- FORMULÁRIO USUÁRIO -->
        <FormularioUsuario 
        :mostrar="mostrarFormulario"
        :id-usuario="idUsuarioASerEditado"
        @fechar="()=>{ mostrarFormulario = false,  idUsuarioASerEditado = null }"
        @recarregar="()=>{ recarregarLista() }"
        />
        
    </div>
</template>

<script>
import FormularioUsuario from '@/views/clientes/formulario.vue'

export default {
    components: {
        FormularioUsuario
    },
    data: () =>{
        return {
            loading: true,
             // Formulário
            idUsuarioASerEditado: null,
            mostrarFormulario: false,
            clientes:[],
            headersClientes:[
                {text:'Nome',value:'nome'},
                {text: 'Cpf', value:'cpf'},
                {text: 'E-Mail', value:'email'},
                {text: 'Observações', value:'observacoes'},
                {text: 'Status', value:'ativo'},
                {text: 'Ações', value:'acoes'}

            ]    
        }
    },
    mounted(){
        // this.obterClientes();
        // this.$axios.http['clientes'].listar()
    },

    created(){
        this.obterClientes();
    },

    methods:{
        obterClientes(){
            this.$servicos.http['clientes'].listar()
            .then(resposta=>{
                this.clientes = resposta.data;
                console.log("CLIENTES: ",this.clientes);
            })
            .catch(error=>{
                console.log("ERROR=>>>  ",error.response);
            })
            .finally(()=>{
                this.loading = false
            })
        },

        adicionarCLiente(){
            this.idUsuarioASerEditado = null
            this.mostrarFormulario = true
        },

        editarCliente(id){
            this.idUsuarioASerEditado = id
            this.mostrarFormulario = true
        },
       
        // CONTEUDO DA LISTA
        // Cor que representa a Flag.
        statusField(usuario) {
        if (usuario) {
            return { cor: 'green', descricao: 'Ativo' }
        } else {
            return { cor: 'red', descricao: 'Inativo' }
            }
        },

        recarregarLista(){
            this.loading = true
            this.obterClientes()
        }
    },
    
}
</script>