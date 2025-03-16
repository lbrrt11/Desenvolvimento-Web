import React from 'react';
import Link from 'next/link';

export default function Tech() {
  return (
    <div className="flex flex-col items-center text-center p-8">
      <header>
        <nav>
          <ul>
            <li><Link href="/" className="inactive">HOME</Link></li>
            <li><Link href="/sobre" className="inactive">SOBRE</Link></li>
            <li><Link href="/tech" className="active">TECH</Link></li>
            <li><Link href="/contato" className="inactive">CONTATO</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="tech">
        <p>🖥️ Durante as aulas na faculdade, já explorei diversas linguagens de programação, algumas delas são:</p>
          <div className="icons">
            <div className="icon-tooltip">
              <img src="/assets/img/java.png" alt="Java" width={50} height={50} />
              <span className="tooltip-text">Java</span>
            </div>
            <div className="icon-tooltip">
              <img src="/assets/img/mysql.png" alt="MySQL" width={50} height={50} />
              <span className="tooltip-text">MySQL</span>
            </div>
            <div className="icon-tooltip">
              <img src="/assets/img/html.png" alt="HTML" width={50} height={50} />
              <span className="tooltip-text">HTML</span>
            </div>
            <div className="icon-tooltip">
              <img src="/assets/img/css.png" alt="CSS" width={50} height={50} />
              <span className="tooltip-text">CSS</span>
            </div>
            <div className="icon-tooltip">
              <img src="/assets/img/github.png" alt="GitHub" width={50} height={50} />
              <span className="tooltip-text">GitHub</span>
            </div>
            <div className="icon-tooltip">
              <img src="/assets/img/javascript.png" alt="JavaScript" width={50} height={50} />
              <span className="tooltip-text">JavaScript</span>
            </div>
            <div className="icon-tooltip">
              <img src="/assets/img/figma.png" alt="Figma" width={50} height={50} />
              <span className="tooltip-text">Figma</span>
            </div>
            <div className="icon-tooltip">
              <img src="/assets/img/nodejs.png" alt="Node.js" width={50} height={50} />
              <span className="tooltip-text">Node.js</span>
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
