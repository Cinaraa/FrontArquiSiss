import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './transactionStatus.css';

export default function TransactionHandler() {
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { getAccessTokenSilently, isLoading } = useAuth0();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token_ws = searchParams.get('token_ws');
        console.log(token_ws)

        if (token_ws) {
            const confirmTransaction = async () => {
                try {
                    if (!isLoading) {
                        const token = await getAccessTokenSilently();
                        const response = await axios.post(
                            'http://localhost:3000/confirm-transaction',
                            {
                                token_ws: token_ws
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                        setTransactionStatus(response.data);
                        console.log(transactionStatus)
                    }
                } catch (err) {
                    setError(err.response ? err.response.data : 'Error fetching transaction status');
                }
            };
            
            confirmTransaction();
        } else {
            setTransactionStatus({ message: 'Transacción fallida: No se proporcionó token' });
        }
    }, [location, getAccessTokenSilently, isLoading]);

    if (error) {
        return <div className="transaction-status"><h1>Error: {error}</h1></div>;
    }

    if (!transactionStatus) {
        return <div className="transaction-status"><h1>Loading...</h1></div>;
    }

    return (
        <div className="transaction-status">
            <h1>{transactionStatus.message}</h1>
            <a className='submit' href='/'>Go home</a>
        </div>
    );
}
