import React, { Component } from 'react';

class Checkout extends Component {

    openCheckout = async (e) => {
        e.preventDefault();

        var handler = window.ePayco.checkout.configure({
            key: '2a99b7a8944c88321bb6c8166500c81e',
            test: true
        });

        const { title, precio, question, userInfo, dataSend } = this.props;

        let data = {
            name: title,
            description: `Servicio temática ${question ? "PREGUNTA" : "TELECONSULTA"}`,
            currency: "usd",
            amount: precio,
            country: "co",
            confirmation: "https://api-dev.mimanualdelbebe.com/api/pae/confirmation",
            response: "",
            extra1: JSON.stringify(userInfo),
            extra2: JSON.stringify(dataSend)
        };
        handler.open(data);
    }

    render() {
        return (
            <React.Fragment>
                <button
                type='button'
                className='btnn bg-pink-500 hover:bg-pink-600 border-none w-10/12 md:w-1/3 rounded text-white px-4 py-2'
                onClick={this.openCheckout}
                >
                Pagar con <b>Epayco</b>
                </button>
            </React.Fragment>
        );
    }
}

export default Checkout;
