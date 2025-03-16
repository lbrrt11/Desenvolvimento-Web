import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center p-8">
      <header>
        <nav>
          <ul>
            <li><Link href="/" className="active">HOME</Link></li>
            <li><Link href="/sobre" className="inactive">SOBRE</Link></li>
            <li><Link href="/tech" className="inactive">TECH</Link></li>
            <li><Link href="/contato" className="inactive">CONTATO</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home">
          <img src="/assets/img/perfil.jpeg" alt="Leonardo Barreto" className="perfil" />
          <h1>👨‍💻 Salve, me chamo Leonardo Barreto.</h1>
          <p>Sou estudante de Sistemas de Informação e adoro tecnologia.</p>
          <p>🚀 Explore meu portfólio e conheça mais sobre mim.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Leonardo Barreto</p>
      </footer>
    </div>
  );
}
