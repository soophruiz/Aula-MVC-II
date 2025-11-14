class ProdutoController {
    constructor() {
        // Inicializa o Model
        this.model = new ProdutoModel();
        
        // Registra a View como listener do Model
        this.model.adicionarListener(this.atualizarView.bind(this));
        
        // Inicializa a View
        this.inicializarView();
    }

    inicializarView() {
        // Configura o evento de submit do formulário
        const form = document.getElementById('produtoForm');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.adicionarProduto();
            });
        }

        // Carrega os produtos existentes
        this.atualizarView(this.model.obterProdutos());
    }

    adicionarProduto() {
        const form = document.getElementById('produtoForm');
        const formData = new FormData(form);
        
        const produtoData = {
            nome: formData.get('nome'),
            preco: formData.get('preco'),
            categoria: formData.get('categoria'),
            descricao: formData.get('descricao'),
            estoque: formData.get('estoque')
        };

        // Validação básica
        if (!produtoData.nome || !produtoData.preco || !produtoData.categoria) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if (parseFloat(produtoData.preco) <= 0) {
            alert('O preço deve ser maior que zero!');
            return;
        }

        // Chama o Model para adicionar o produto
        this.model.adicionarProduto(produtoData);

        // Limpa o formulário
        form.reset();
    }

    removerProduto(id) {
        if (confirm('Tem certeza que deseja remover este produto?')) {
            this.model.removerProduto(id);
        }
    }

   atualizarView(produtos) {
    const container = document.getElementById('produtosContainer');
    if (!container) return;
    
    if (produtos.length === 0) {
        container.innerHTML = '<p>Nenhum produto cadastrado ainda.</p>';
        return;
    }

    container.innerHTML = produtos.map(produto => `
        <div class="produto-item categoria-${produto.categoria}">
            <h3>${this.escapeHtml(produto.nome)}</h3>
            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
            <p><strong>Categoria:</strong> ${this.formatarCategoria(produto.categoria)}</p>
            <p><strong>Estoque:</strong> ${produto.estoque} unidades</p>
            ${produto.descricao ? `<p><strong>Descrição:</strong> ${this.escapeHtml(produto.descricao)}</p>` : ''}
            <p><strong>Cadastrado em:</strong> ${produto.dataCadastro}</p>
            <button onclick="controller.removerProduto(${produto.id})">Remover</button>
        </div>
    `).join('');
}

    formatarCategoria(categoria) {
        const categorias = {
            'eletronicos': 'Eletrônicos',
            'vestuario': 'Vestuário',
            'alimentacao': 'Alimentação',
            'livros': 'Livros'
        };
        return categorias[categoria] || categoria;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializa o Controller quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.controller = new ProdutoController();
});