import React, { Component } from "react";
import { Icon, Anchor } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/LogoLandingPage.png";
import DrawDifference from "../../assets/images/difference-illustration.png";
import Footer from "../../components/Footer";
import "./landingPage.less";

const LinkAnchor = Anchor.Link;

class LandingPage extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }
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
              <Link to="/list" className="btn-calculate">
                Calcular tarifa
              </Link>
              <a href="#white-tariff" className="link-difference">
                <span>Qual a diferença entre as tarifas?</span>
              </a>
            </div>
            <div className="down-arrow">
              <Anchor affix={false}>
              <LinkAnchor href="#white-tariff" title={<Icon type="down" className="icon-arrow" />}>
                
              </LinkAnchor>
              </Anchor>
            </div>
          </div>
        </section>

        <div id="white-tariff">
          <section className="white-tariff">
            <div className="about">
              <div className="difference-tariffs">
                <div className="title">
                  <h1 className="title-difference">Qual a diferença?</h1>
                  <span className="border-bottom" />
                </div>
                <div className="content-difference">
                  <p className="description">
                    Com a tarifa branca há três tipos de cobranças com preços
                    diferentes ao longo do dia, de acordo com o horário de uso
                    dos equipamentos.
                  </p>
                  <div>
                    <img
                      src={DrawDifference}
                      className="illustration-difference"
                      alt=""
                    />
                  </div>
                  <div className="calculate-tariffs">
                    <Link to="/list" className="btn-calculate-tariff">
                      Calcular tarifa
                    </Link>
                  </div>
                  <div />
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}
export default LandingPage;
