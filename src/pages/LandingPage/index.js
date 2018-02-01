import React, { Component } from "react";
import { Icon } from "antd";
import Logo from "../../assets/images/LogoLandingPage.png";
import DrawDifference from "../../assets/images/difference-illustration.png";
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
              <Link to="/list">
                <button className="btn-calculate">Calcular tarifa</button>
              </Link>
              <span>Qual a diferença entre as tarifas?</span>
            </div>
            <div className="down-arrow">
              <Anchor>
                <Link href="#test-anchor" title='teste'/>
              </Anchor>
            </div>
          </div>
        </section>
        <section className="white-tariff" id="test-anchor">
          <div className="about">
            <div className="difference-tariffs">
              <div className="title">
                <h1 className="title-difference">Qual a diferença?</h1>
                <span className="border-bottom" />
              </div>
              <div className="content-difference">
                <p className="description">
                  Com a tarifa branca há três tipos de cobranças com preços
                  diferentes ao longo do dia, de acordo com o horário de uso dos
                  equipamentos.
                </p>

                <div>
                  <img
                    src={DrawDifference}
                    className="illustration-difference"
                    alt=""
                  />
                </div>
                <div className="calculate-tariffs">
                  <Link to="/list">
                    <button className="btn-calculate-tariff">
                      Calcular tarifa
                    </button>
                  </Link>
                </div>
                <div />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
export default LandingPage;
