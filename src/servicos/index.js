import clientes from './clientes.js'

export function obterServicos(httpService){
    clientes.instalar(httpService)
    
    return{
        clientes
    }
}
