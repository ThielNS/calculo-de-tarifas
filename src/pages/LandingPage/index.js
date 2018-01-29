import React, { Component } from "react";
import logo from "../../assets/images/LogoLandingPage.png";
import "./landingPage.less";

class LandingPage extends Component {
    render() {
        return (
            <div>
                <section className="banner">
                    <div>
                        <img src={logo} alt="" />
                        <h1 className="title">A tarifa branca já está em vigor na sua conta de luz</h1>
                        <h2 className="subtitle">Veja o quanto economizará com essa nova opção.</h2>
                    </div>
                    <div className="content-links">
                        <button className="btn-calculate">Calcular tarifa</button>
                        <span>Qual a diferença entre as tarifas?</span>
                    </div>
                </section>
            </div>
        )
    }
}
export default LandingPage;