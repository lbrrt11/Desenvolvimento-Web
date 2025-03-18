'use client';

import React, { useState } from "react";
import "../globals.css";

export default function Clientes() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteEditando, setClienteEditando] = useState<any | null>(null);

  const salvarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();

    const nome = (evento.target as any).nome.value;
    const id = Number((evento.target as any).id.value); // Garantir que o ID seja um número inteiro

    const novoCliente = { nome, id, ativo: true };
    if (clienteEditando) {
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente === clienteEditando
            ? { ...cliente, nome, id }
            : cliente
        )
      );
      setClienteEditando(null);
    } else {
      setClientes((prevClientes) => [...prevClientes, novoCliente]);
    }

    setModalVisivel(false);
    (evento.target as any).reset();
  };

  const alternarStatus = (index: number) => {
    setClientes((prevClientes) =>
      prevClientes.map((cliente, i) =>
        i === index ? { ...cliente, ativo: !cliente.ativo } : cliente
      )
    );
  };

  const editarCliente = (cliente: any) => {
    setClienteEditando(cliente);
    setModalVisivel(true);
  };

  return (
    <>
      <header>
        <nav>
          <a href="./clientes/" className="botao-nav ativo">Clientes</a>
          <a href="./produto/" className="botao-nav">Produtos</a>
          <a href="./compra/" className="botao-nav">Compras</a>
          <a href="./fornecedor/" className="botao-nav">Fornecedores</a>
          <a href="./local/" className="botao-nav">Locais</a>
        </nav>
      </header>

      <main>
        <button onClick={() => setModalVisivel(true)}>Novo Cliente</button>
        <div id="container-clientes" className={clientes.length === 0 ? "vazio" : ""}>
          {clientes.length === 0 ? (
            <div className="vazio">Nenhum cliente cadastrado ainda.</div>
          ) : (
            clientes.map((cliente, index) => (
              <div key={index} className={`cartao-cliente ${!cliente.ativo ? "inativo" : ""}`}>
                <h3>{cliente.nome}</h3>
                <p>ID: {cliente.id}</p>
                <button onClick={() => editarCliente(cliente)}>
                  Editar
                </button>
                <button onClick={() => alternarStatus(index)}>
                  {cliente.ativo ? "Inativar" : "Ativar"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {modalVisivel && (
        <div className="modal">
          <div className="conteudo-modal">
            <h2>{clienteEditando ? "Editar Cliente" : "Cadastrar novo cliente"}</h2>
            <form onSubmit={salvarFormulario}>
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                defaultValue={clienteEditando?.nome || ""}
                required
              />
              <input
                type="number"
                name="id"
                placeholder="ID"
                defaultValue={clienteEditando?.id || ""}
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