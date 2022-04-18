import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import web from "../../assets/cpg.png"
import "./index.css"
import NavBarLogin from './NavBarLogin';

function Home() {
  return (
    
    <div><NavBarLogin/>
      <section id="header" className="d-flex align-items-center">
         

        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="body ">
                  <h1>
                    Welcome to CPG <strong className="brand-name"></strong>
                  </h1>
                  <h2 className="my-4">
                    CPG est une entreprise tunisienne d'exploitation des
                    phosphates basée à Gafsa. La CPG figure parmi les plus
                    importants producteurs de phosphates, occupant la cinquième
                    place mondiale. L'activité de l'entreprise se définit en 4
                    grands groupes: La préparation du terrain, extraction,
                    production et la commercialisation des phosphates.
                  </h2>
              
                </div>
                <div className="mt-3">
                  <BrowserRouter>
                  <Link to="/about" className="btn-get-started">
                    Commencer
                  </Link>
                  </BrowserRouter>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 header-img">
                  <img
                    src={web}
                    className="img-fluid animated"
                    alt="home img"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  )
}

export default Home