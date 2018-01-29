import React, { Component } from "react";
import Logo from "../../assets/images/LogoLandingPage.png";
import DownArrow from "../../assets/images/down-arrow.png";
import DrawDifference from "../../assets/images/draw-landing-page.png";
import Footer from "../../components/Footer";
import "./landingPage.less";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <section className="banner">
          <div className="content-banner">
            <div>
              <img src={Logo} alt="" />
              <h1 className="title">
                A tarifa branca já está em vigor na sua conta de luz
              </h1>
              <h2 className="subtitle">
                Veja o quanto economizará com essa nova opção.
              </h2>
            </div>
            <div className="content-links">
              <button className="btn-calculate">Calcular tarifa</button>
              <span>Qual a diferença entre as tarifas?</span>
            </div>
            <div className="down-arrow">
              <img src={DownArrow} alt="" />
            </div>
          </div>
        </section>
        <section className="white-tariff">
          <div className="about">
            <div>
              <img
                src={DrawDifference}
                className="illustration-difference"
                alt=""
              />
            </div>
            <div className="difference-tariffs">
              <h1 className="title-difference">Qual a diferença?</h1>
              <span className="border-bottom" />
              <p className="content-difference">
                Com a tarifa branca há três tipos de cobranças com preços
                diferentes ao longo do dia, de acordo com o horário de uso dos
                equipamentos.
              </p>
              <button className="btn-calculate-tariff">Calcular tarifa</button>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
}
export default LandingPage;
