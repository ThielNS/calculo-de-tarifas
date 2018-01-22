import React, { Component } from "react";
import "./style.less";

class MonthlyExpenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            whiteRate: 18.452655,
            conventionalRate: 36.859999999,
            differenceRates: 67.9111111
        }
    }

    formattNumber = value => {
        const number = parseFloat(value).toFixed(2);
        return `R$ ${number}`
    };

    render() {
        const { whiteRate, conventionalRate, differenceRates } = this.state;

        return (
            <section className="card-expenses-monthly _margin-bottom">
                <div className="account-spend">
                    <h2 className="title-card">Gasto Mensal</h2>
                    <div className="rates-content _margin-top">
                        <div>
                            <h3 className="highlight-rate">Tarifa branca</h3>
                            <i className="rate">{this.formattNumber(whiteRate)}</i>
                        </div>
                        <div className="conventional-rate">
                            <h3>Tarifa convencional</h3>
                            <i className="rate">{this.formattNumber(conventionalRate)}</i>
                        </div>
                    </div>
                </div>
                <i className="border-vertical"></i>
                <div className="expense-feedback">
                    <p> <i className="highlight-rate rate-white">Tarifa Branca</i> é mais adequada. Você economizará  <i className="highlight-rate cash-difference">{this.formattNumber(differenceRates)}</i></p>
                </div>
            </section>
        )
    }
}

export default MonthlyExpenses;