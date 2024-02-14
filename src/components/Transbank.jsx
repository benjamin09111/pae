import axios from "axios";
import React from "react";
import { useState } from "react";

const PaymentComponent = ({ precio }) => {
    const [paymentUrl, setPaymentURL] = useState(null)
    const [error, setError] = useState('')

    const initiatePayment = async () => {
        const min = 1000;
        const max = 9000;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        
        try {
            const response = await axios.post('https://api-dev.mimanualdelbebe.com/api/transbank/initiate-payment', {
                buy_order: randomNumber,
                session_id: "session" + randomNumber,
                amount: precio
            });

            const { url } = response.data;
            setPaymentURL(url)
            window.location.href = url
        }
        catch (error) {
            setError('Error al iniciar el pago, inténtalo de nuevo');
            console.log(error)
        }
    };

    return (
        <div className="w-full flex flex-col">
            <button className='btnn bg-pink-500 hover:bg-pink-600 border-none w-10/12 md:w-1/3 rounded text-white px-4 py-2'
                onClick={(e) => {
                    e.preventDefault();
                    initiatePayment();
                }}>Pagar con <b>Transbank</b></button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
export default PaymentComponent;