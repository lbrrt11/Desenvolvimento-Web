'use client';

import React, { useState } from 'react';
import '../globals.css';

export default function Compra() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [compras, setCompras] = useState<any[]>([]);
  const [compraEditando, setCompraEditando] = useState<any | null>(null);

  const salvarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();

    const produto = (evento.target as any).produto.value;
    const quantidade = Number((evento.target as any).quantidade.value);
    const status = (evento.target as any).status.value;

    const novaCompra = { produto, quantidade, status, ativo: true };
    if (compraEditando) {
      setCompras((prevCompras) =>
        prevCompras.map((compra) =>
          compra === compraEditando ? { ...compra, produto, quantidade, status } : compra
        )
      );
      setCompraEditando(null);
    } else {
      setCompras((prevCompras) => [...prevCompras, novaCompra]);
    }

    setModalVisivel(false);
    (evento.target as any).reset();
  };

  const alternarStatus = (index: number) => {
    setCompras((prevCompras) =>
      prevCompras.map((compra, i) =>
        i === index ? { ...compra, ativo: !compra.ativo } : compra
      )
    );
  };

  const editarCompra = (compra: any) => {
    setCompraEditando(compra);
    setModalVisivel(true);
  };

  return (
    <>
      <header>
        <nav>
          <a href="./clientes/" className="botao-nav">Clientes</a>
          <a href="./produto/" className="botao-nav">Produtos</a>
          <a href="./compra/" className="botao-nav ativo">Compras</a>
          <a href="./fornecedor/" className="botao-nav">Fornecedores</a>
          <a href="./local/" className="botao-nav">Locais</a>
        </nav>
      </header>

      <main>
        <button onClick={() => setModalVisivel(true)}>Nova Compra</button>
        <div id="container-compras" className={compras.length === 0 ? "vazio" : ""}>
          {compras.length === 0 ? (
            <div className="vazio">Nenhuma compra registrada ainda.</div>
          ) : (
            compras.map((compra, index) => (
              <div key={index} className={`cartao-compra ${!compra.ativo ? "inativo" : ""}`}>
                <h3>{compra.produto}</h3>
                <p>Quantidade: {compra.quantidade}</p>
                <p>Status: {compra.status}</p>
                <button onClick={() => editarCompra(compra)}>Editar</button>
                <button onClick={() => alternarStatus(index)}>
                  {compra.ativo ? "Inativar" : "Ativar"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {modalVisivel && (
        <div className="modal">
          <div className="conteudo-modal">
            <h2>{compraEditando ? "Editar Compra" : "Registrar Compra"}</h2>
            <form onSubmit={salvarFormulario}>
              <input
                type="text"
                name="produto"
                placeholder="Produto"
                defaultValue={compraEditando?.produto || ""}
                required
              />
              <input
                type="number"
                name="quantidade"
                placeholder="Quantidade"
                defaultValue={compraEditando?.quantidade || ""}
                required
              />
              <select name="status" defaultValue={compraEditando?.status || "Em Processo"}>
                <option value="Em Processo">Em Processo</option>
                <option value="Finalizada">Finalizada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
              <div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setModalVisivel(false)}>
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