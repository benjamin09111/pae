import React, { Component } from 'react';

class Checkout extends Component {

    openCheckout = async (e) => {
        e.preventDefault();

        const { title, precio, question, userInfo, dataSend, setMessageError } = this.props;

        var handler = window.ePayco.checkout.configure({
            key: '2a99b7a8944c88321bb6c8166500c81e',
            test: true
        });

        const execute = () => {
            let data = {
                name: title,
                description: `Servicio temática ${question ? "PREGUNTA" : "TELECONSULTA"}`,
                currency: "usd",
                amount: precio,
                country: "co",
                confirmation: "https://api-dev.mimanualdelbebe.com/api/epayco/confirm-payment",
                response: `${question ? "http://localhost:5173/thanksp" : "http://localhost:5173/thankst"}?dataSend=${encodeURIComponent(JSON.stringify(dataSend))}&userInfo=${encodeURIComponent(JSON.stringify(userInfo))}`,
            };
            handler.open(data);
        }

        var pass1, pass2;

        pass1 = (Object.values(dataSend).some(value => value === ""));

        pass2 = (Object.values(userInfo).some(value => value === ""));

        if(!pass1 && !pass2){
            execute();
        }else{
            setMessageError("Debe completar los campos.");
        }
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
