import React, { Component } from "react";
import "./monthlyExpenses.less";

class MonthlyExpenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            whiteRate: 18.452655,
            conventionalRate: 36.859999999,
            differenceRates: 67.9111111
        }
    }

    componentDidMount() {
        this.props.listCalculateTariffs();
    }

    formattNumber = value => {
        const number = parseFloat(value).toFixed(2);
        return `R$ ${number}`
    };

    getWhiteTariffs() {
        const { listEquipments } = this.props;
        let whiteTariffs = [0.00];

        Object.keys(listEquipments).forEach(function (key) {
            var valueWhiteTariff = listEquipments[key]['whiteTariff'];
            whiteTariffs.push(valueWhiteTariff);
        })
        return whiteTariffs.reduce((a, b) => { return a + b })

    }

    getConventionalTariffs() {
        const { listEquipments } = this.props;
        let conventionalTariffs = [0.00];

        Object.keys(listEquipments).forEach((key) => {
            var valueConventionalTariff = listEquipments[key]['conventionalTariff'];
            conventionalTariffs.push(valueConventionalTariff);
        })
        return conventionalTariffs.reduce((a, b) => { return a + b });
    }


    getDifferenceTariffs() {
        let total = 0.00;
        total = (this.getConventionalTariffs() - this.getWhiteTariffs());
        return total;
    }

    render() {
        const { listEquipments } = this.props;

        return (
            <section className="card-expenses-monthly _margin-bottom">
                <div className="account-spend">
                    <h2 className="title-card">Gasto Mensal</h2>
                    <div className="rates-content _margin-top">
                        <div>
                            <h3 className="highlight-rate">Tarifa branca</h3>
                            <span className="rate">{this.formattNumber(this.getWhiteTariffs())}</span>
                        </div>
                        <div className="conventional-rate">
                            <h3>Tarifa convencional</h3>
                            <span className="rate">{this.formattNumber(this.getConventionalTariffs())}</span>
                        </div>
                    </div>
                </div>
                <i className="border-vertical"
                ></i>
                {listEquipments.length >= 1 ? <div className="expense-feedback">
                    <p> <span className="highlight-rate rate-white">Tarifa Branca</span> é mais adequada. Você economizará  <span className="highlight-rate cash-difference">{this.formattNumber(this.getDifferenceTariffs())}</span></p>
                </div> : <div className="expense-feedback"><span>Não há nenhum equipamento na lista</span></div>}

            </section>
        )
    }
}

export default MonthlyExpenses;