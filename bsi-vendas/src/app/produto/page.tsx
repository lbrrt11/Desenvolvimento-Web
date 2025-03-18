'use client';

import React, { useState } from 'react';
import '../globals.css';

export default function Produtos() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<any | null>(null);

  const salvarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();

    const id = parseInt((evento.target as any).id.value); // Garantir que o ID seja um número inteiro
    const nome = (evento.target as any).nome.value;
    const preco = parseFloat((evento.target as any).preco.value);

    if (isNaN(preco)) {
      alert("Por favor, insira um preço válido.");
      return;
    }

    const novoProduto = { id, nome, preco, ativo: true };
    if (produtoEditando) {
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto === produtoEditando ? { ...produto, id, nome, preco } : produto
        )
      );
      setProdutoEditando(null);
    } else {
      setProdutos((prevProdutos) => [...prevProdutos, novoProduto]);
    }

    setModalVisivel(false);
    (evento.target as any).reset();
  };

  const alternarStatus = (index: number) => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto, i) =>
        i === index ? { ...produto, ativo: !produto.ativo } : produto
      )
    );
  };

  const editarProduto = (produto: any) => {
    setProdutoEditando(produto);
    setModalVisivel(true);
  };

  return (
    <>
      <header>
        <nav>
          <a href="./clientes/" className="botao-nav">Clientes</a>
          <a href="./produto/" className="botao-nav ativo">Produtos</a>
          <a href="./compra/" className="botao-nav">Compras</a>
          <a href="./fornecedor/" className="botao-nav">Fornecedores</a>
          <a href="./local/" className="botao-nav">Locais</a>
        </nav>
      </header>

      <main>
        <button onClick={() => setModalVisivel(true)}>Novo Produto</button>
        <div id="container-produtos" className={produtos.length === 0 ? "vazio" : ""}>
          {produtos.length === 0 ? (
            <p>Nenhum produto registrado ainda.</p>
          ) : (
            produtos.map((produto, index) => (
              <div key={index} className={`cartao-produto ${!produto.ativo ? "inativo" : ""}`}>
                <h3>{produto.nome}</h3>
                <p>ID: {produto.id}</p>
                <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                <p>{produto.descricao}</p>
                <button onClick={() => editarProduto(produto)}>Editar</button>
                <button onClick={() => alternarStatus(index)}>
                  {produto.ativo ? "Inativar" : "Ativar"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {modalVisivel && (
        <div className="modal">
          <div className="conteudo-modal">
            <h2>{produtoEditando ? 'Editar Produto' : 'Registrar produto'}</h2>
            <form onSubmit={salvarFormulario}>
              <input
                type="text"
                name="nome"
                placeholder="Nome do Produto"
                defaultValue={produtoEditando?.nome || ''}
                required
              />
              <input
                type="number"
                name="id"
                placeholder="ID"
                defaultValue={produtoEditando?.id || ''}
                required
                min="1" // Garantir que o ID seja um número inteiro positivo
              />
              <input
                type="number"
                name="preco"
                step="0.01"
                placeholder="Preço"
                defaultValue={produtoEditando?.preco || ''}
                required
              />
              <div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setModalVisivel(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}