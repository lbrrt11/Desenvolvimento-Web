import React from 'react';
import Link from 'next/link';

export default function Sobre() {
  return (
    <div className="flex flex-col items-center text-center p-8">
      <header>
        <nav>
          <ul>
            <li><Link href="/" className="inactive">HOME</Link></li>
            <li><Link href="/sobre" className="active">SOBRE</Link></li>
            <li><Link href="/tech" className="inactive">TECH</Link></li>
            <li><Link href="/contato" className="inactive">CONTATO</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="sobre">
          <p>📚 Conclui o ensino médio em 2021 na Cooedita e atualmente estou cursando Bacharelado em Sistemas de Informação no IF Baiano no campus de Itapetinga-BA - Onde nasci e cresci. Sempre tive uma certa afinidade com a área por conta dos jogos.</p><br />
          <p>🖥️ Já explorei diversas linguagens de programação, onde a lógica, a análise e a organização de dados se unem para criar sistemas robustos.</p><br />
          <p>🎮 Fora do mundo da programação, meus hobbies incluem assistir animes e lives, jogar videogame e futebol.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Leonardo Barreto</p>
      </footer>
    </div>
  );
}
