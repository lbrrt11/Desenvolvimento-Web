'use client';

import React, { useState } from 'react';
import '../globals.css';

export default function Fornecedor() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [fornecedores, setFornecedores] = useState<any[]>([]);
  const [fornecedorEditando, setFornecedorEditando] = useState<any | null>(null);

  const salvarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();

    const nome = (evento.target as any).nome.value;
    const id = Number((evento.target as any).id.value);

    const novoFornecedor = { nome, id, ativo: true };
    if (fornecedorEditando) {
      setFornecedores((prev) =>
        prev.map((f) =>
          f === fornecedorEditando ? { ...f, nome, id } : f
        )
      );
      setFornecedorEditando(null);
    } else {
      setFornecedores((prev) => [...prev, novoFornecedor]);
    }

    setModalVisivel(false);
    (evento.target as any).reset();
  };

  const alternarStatus = (index: number) => {
    setFornecedores((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, ativo: !f.ativo } : f
      )
    );
  };

  const editarFornecedor = (fornecedor: any) => {
    setFornecedorEditando(fornecedor);
    setModalVisivel(true);
  };

  return (
    <>
      <header>
        <nav>
          <a href="./clientes/" className="botao-nav">Clientes</a>
          <a href="./produto/" className="botao-nav">Produtos</a>
          <a href="./compra/" className="botao-nav">Compras</a>
          <a href="./fornecedor/" className="botao-nav ativo">Fornecedores</a>
          <a href="./local/" className="botao-nav">Locais</a>
        </nav>
      </header>

      <main>
        <button onClick={() => setModalVisivel(true)}>Novo Fornecedor</button>
        <div id="container-fornecedores" className={fornecedores.length === 0 ? "vazio" : ""}>
          {fornecedores.length === 0 ? (
            <div className="vazio">Nenhum fornecedor registrado ainda.</div>
          ) : (
            fornecedores.map((fornecedor, index) => (
              <div key={index} className={`cartao-fornecedor ${!fornecedor.ativo ? "inativo" : ""}`}>
                <h3>{fornecedor.nome}</h3>
                <p>ID: {fornecedor.id}</p>
                <button onClick={() => editarFornecedor(fornecedor)}>Editar</button>
                <button onClick={() => alternarStatus(index)}>
                  {fornecedor.ativo ? "Inativar" : "Ativar"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {modalVisivel && (
        <div className="modal">
          <div className="conteudo-modal">
            <h2>{fornecedorEditando ? "Editar Fornecedor" : "Cadastrar Fornecedor"}</h2>
            <form onSubmit={salvarFormulario}>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                defaultValue={fornecedorEditando?.nome || ""}
                required
              />
              <input
                type="number"
                name="id"
                placeholder="ID"
                defaultValue={fornecedorEditando?.id || ""}
                required
                min="1"
              />
              <div>
                <button type="submit">Salvar</button>
                <button
                  type="button"
                  onClick={() => setModalVisivel(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
