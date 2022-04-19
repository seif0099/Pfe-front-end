import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import web from "../../assets/cpg.png"
import "./home.css"

function Home() {
  return (
    <div className='hcontainer'>
      <nav>
        <a className="links" href="#">Accueil</a>
        <a className="links" href="#">A propos</a>
        <div className="dropdown-menu">
        <a className="menu-btn">Se connecter </a>
        <div className="menu-content">
        <BrowserRouter forceRefresh={true}>
        <Link to="/login" className="btn-get-started">
        <a className="links-hidden" href="#">Employée</a>
        </Link>
        </BrowserRouter>
        <BrowserRouter forceRefresh={true}>
        <Link to="/admin" className="btn-get-started">
        <a className="links-hidden" href="#">Admin</a>
        </Link>
        </BrowserRouter>
        
        <BrowserRouter forceRefresh={true}>
        <Link to="/signup" className="btn-get-started">
        <a className="links-hidden" href="#">Signup</a>
        </Link>
        </BrowserRouter>
        </div>
        </div>
      </nav>
      <div className='hinner'>
          <div className='leftPanel'>
                  <h1>
                    Welcome to CPG <strong className="brand-name"></strong>
                  </h1>
                  <h2 className>
                    CPG est une entreprise tunisienne d'exploitation des
                    phosphates basée à Gafsa. La CPG figure parmi les plus
                    importants producteurs de phosphates, occupant la cinquième
                    place mondiale. L'activité de l'entreprise se définit en 4
                    grands groupes: La préparation du terrain, extraction,
                    production et la commercialisation des phosphates.
                  </h2>
                  <BrowserRouter>
                  <Link to="/about" className="btn-get-started">
                    <button >Commencer</button>
                  </Link>
                  </BrowserRouter>
          </div>

          <div className='rightPanel'>
               <div>
                  <img
                    src={web}
                    className="img-fluid animated"
                    alt="home img"
                  />
                </div>
          </div>
      </div>
                
      </div>
  )
}

export default Home