let http = null

export default {
  instalar: (conexao) => { // Função obrigatória
    http = conexao
  },

  listar: () => {
    return http.get('rest/clientes/')
  },

  carregarPorId: (id) => {
    return http.get('rest/clientes/'+id)
  },

  editarCliente: (obj) => {
    return http.put('rest/clientes/' + obj.id, obj)
  },

  cadastrarCliente: (obj) => {
    return http.post('rest/clientes/',obj)
  }



}
