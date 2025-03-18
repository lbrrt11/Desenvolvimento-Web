import axios from "axios";

// URL do backend, pode ser modificada conforme o ambiente
const API_URL = "http://localhost:3000";

// Função para pegar todos os clientes
export async function getClientes(): Promise<any[]> {
    try {
        const response = await axios.get(`${API_URL}/clientes`);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        throw error;
    }
}

// Função para salvar um novo cliente
export async function postCliente(cliente: { id: number, nome: string }): Promise<any> { // Alterado para id ser número
    try {
        const response = await axios.post(`${API_URL}/clientes`, cliente);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
        throw error;
    }
}

// Função para pegar todos os produtos
export async function getProdutos(): Promise<any[]> {
    try {
        const response = await axios.get(`${API_URL}/produtos`);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        throw error;
    }
}

// Função para salvar um novo produto
export async function postProduto(produto: { id: number, nome: string, preco: number }): Promise<any> { // Alterado para id ser número
    try {
        const response = await axios.post(`${API_URL}/produtos`, produto);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        throw error;
    }
}

// Função para pegar todas as compras
export async function getCompras(): Promise<any[]> {
    try {
        const response = await axios.get(`${API_URL}/compras`);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar compras:', error);
        throw error;
    }
}

// Função para salvar uma nova compra
export async function postCompra(compra: { id: number, data: string, id_produto: number, id_fornecedor: number, id_cliente: number, status: string }): Promise<any> { // Alterado para id ser número
    try {
        const response = await axios.post(`${API_URL}/compras`, compra);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar compra:', error);
        throw error;
    }
}

// Função para pegar todos os fornecedores
export async function getFornecedores(): Promise<any[]> {
    try {
        const response = await axios.get(`${API_URL}/fornecedores`);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
        throw error;
    }
}

// Função para salvar um novo fornecedor
export async function postFornecedor(fornecedor: { id: number, nome: string, contato: string }): Promise<any> { // Alterado para id ser número
    try {
        const response = await axios.post(`${API_URL}/fornecedores`, fornecedor);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar fornecedor:', error);
        throw error;
    }
}

// Função para pegar todos os locais
export async function getLocais(): Promise<any[]> {
    try {
        const response = await axios.get(`${API_URL}/locais`);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar locais:', error);
        throw error;
    }
}

// Função para salvar um novo local
export async function postLocal(local: { id: number, nome: string, endereco: string }): Promise<any> { // Alterado para id ser número
    try {
        const response = await axios.post(`${API_URL}/locais`, local);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar local:', error);
        throw error;
    }
}