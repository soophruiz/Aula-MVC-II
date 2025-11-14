class ProdutoModel {
    constructor() {
        this.produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        this.listeners = [];
    }

    // Adiciona listener para atualizações
    adicionarListener(listener) {
        this.listeners.push(listener);
    }

    // Notifica todos os listeners sobre mudanças
    notificarListeners() {
        this.listeners.forEach(listener => listener(this.produtos));
    }

    // Salva produtos no localStorage
    salvarNoStorage() {
        localStorage.setItem('produtos', JSON.stringify(this.produtos));
    }

    // Adiciona um novo produto
    adicionarProduto(produtoData) {
        const novoProduto = {
            id: Date.now(), // ID único baseado no timestamp
            nome: produtoData.nome,
            preco: parseFloat(produtoData.preco),
            categoria: produtoData.categoria,
            descricao: produtoData.descricao || '',
            estoque: parseInt(produtoData.estoque),
            dataCadastro: new Date().toLocaleString('pt-BR')
        };

        this.produtos.push(novoProduto);
        this.salvarNoStorage();
        this.notificarListeners();
        
        return novoProduto;
    }

    // Busca todos os produtos
    obterProdutos() {
        return this.produtos;
    }

    // Remove um produto pelo ID
    removerProduto(id) {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        this.salvarNoStorage();
        this.notificarListeners();
    }

    // Busca produto por ID
    obterProdutoPorId(id) {
        return this.produtos.find(produto => produto.id === id);
    }

    // Atualiza um produto
    atualizarProduto(id, dadosAtualizados) {
        const index = this.produtos.findIndex(produto => produto.id === id);
        if (index !== -1) {
            this.produtos[index] = { ...this.produtos[index], ...dadosAtualizados };
            this.salvarNoStorage();
            this.notificarListeners();
            return true;
        }
        return false;
    }
}