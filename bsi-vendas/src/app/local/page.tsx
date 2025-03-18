'use client';

import React, { useState } from 'react';
import '../globals.css';

export default function Local() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [locais, setLocais] = useState<any[]>([]);
  const [localEditando, setLocalEditando] = useState<any | null>(null);

  const salvarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();

    const nome = (evento.target as any).nome.value;
    const endereco = (evento.target as any).endereco.value;

    const novoLocal = { nome, endereco, ativo: true };
    if (localEditando) {
      setLocais((prev) =>
        prev.map((l) =>
          l === localEditando ? { ...l, nome, endereco } : l
        )
      );
      setLocalEditando(null);
    } else {
      setLocais((prev) => [...prev, novoLocal]);
    }

    setModalVisivel(false);
    (evento.target as any).reset();
  };

  const alternarStatus = (index: number) => {
    setLocais((prev) =>
      prev.map((l, i) =>
        i === index ? { ...l, ativo: !l.ativo } : l
      )
    );
  };

  const editarLocal = (local: any) => {
    setLocalEditando(local);
    setModalVisivel(true);
  };

  return (
    <>
      <header>
        <nav>
          <a href="./clientes/" className="botao-nav">Clientes</a>
          <a href="./produto/" className="botao-nav">Produtos</a>
          <a href="./compra/" className="botao-nav">Compras</a>
          <a href="./fornecedor/" className="botao-nav">Fornecedores</a>
          <a href="./local/" className="botao-nav ativo">Locais</a>
        </nav>
      </header>

      <main>
        <button onClick={() => setModalVisivel(true)}>Novo Local</button>
        <div id="container-locais" className={locais.length === 0 ? "vazio" : ""}>
          {locais.length === 0 ? (
            <div className="vazio">Nenhum local registrado ainda.</div>
          ) : (
            locais.map((local, index) => (
              <div key={index} className={`cartao-local ${!local.ativo ? "inativo" : ""}`}>
                <h3>{local.nome}</h3>
                <p>Endereço: {local.endereco}</p>
                <button onClick={() => editarLocal(local)}>Editar</button>
                <button onClick={() => alternarStatus(index)}>
                  {local.ativo ? "Inativar" : "Ativar"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {modalVisivel && (
        <div className="modal">
          <div className="conteudo-modal">
            <h2>{localEditando ? "Editar Local" : "Cadastrar Local"}</h2>
            <form onSubmit={salvarFormulario}>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                defaultValue={localEditando?.nome || ""}
                required
              />
              <input
                type="text"
                name="endereco"
                placeholder="Endereço"
                defaultValue={localEditando?.endereco || ""}
                required
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
