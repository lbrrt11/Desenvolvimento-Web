import React from 'react';
import Link from 'next/link';

export default function Contato() {
  return (
    <div className="flex flex-col items-center text-center p-8">
      <header>
        <nav>
          <ul>
            <li><Link href="/" className="inactive">HOME</Link></li>
            <li><Link href="/sobre" className="inactive">SOBRE</Link></li>
            <li><Link href="/tech" className="inactive">TECH</Link></li>
            <li><Link href="/contato" className="active">CONTATO</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="contato">
        <p>Como entrar em contato:</p>
          <div className="contato-lista">
            <div className="contato-item">
              <img src="/assets/img/whatsapp.png" alt="WhatsApp" className="contato-icon" />
              <a href="https://wa.me/557791409973" target="_blank" rel="noopener noreferrer">+55 77 9 9140-9973</a>
            </div>
            <div className="contato-item">
              <img src="/assets/img/instagram.png" alt="Instagram" className="contato-icon" />
              <a href="https://www.instagram.com/l_brrt11/" target="_blank" rel="noopener noreferrer">@l_brrt11</a>
            </div>
            <div className="contato-item">
              <img src="/assets/img/email.png" alt="Gmail" className="contato-icon" />
              <a href="mailto:leonardobarreto167@gmail.com">leonardobarreto167@gmail.com</a>
            </div>
            <div className="contato-item">
              <img src="/assets/img/github.png" alt="GitHub" className="contato-icon" />
              <a href="https://github.com/lbrrt11" target="_blank" rel="noopener noreferrer">lbrrt11</a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Leonardo Barreto</p>
      </footer>
    </div>
  );
}