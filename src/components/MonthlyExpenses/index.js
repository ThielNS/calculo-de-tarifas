import React, { Component } from "react";
import "./style.less";

class MonthlyExpenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            whiteRate: "321,94",
            conventionalRate: "368,85",
            differenceRates: "67,91"
        }
    }

    render() {
        const { whiteRate, conventionalRate, differenceRates } = this.state;

        console.log(whiteRate);
        console.log(conventionalRate);

        return (
            <section className="card-expenses-monthly">
                <div className="account-spend">
                    <h2>Gasto mensal</h2>
                    <div className="rates-content">
                        <div className="white-rate">
                            <h3>Tarifa branca</h3>
                            <i>R$ {whiteRate}</i>
                        </div>
                        <div className="conventional-rate">
                            <h3>Tarifa convencional</h3>
                            <i>R$ {conventionalRate}</i>
                        </div>
                    </div>
                </div>
                <div className="expense-feedback">
                    <p>Tarifa Branca é mais adequada. Você economizará R$ {differenceRates}</p>
                </div>
            </section>
        )
    }
}

export default MonthlyExpenses;