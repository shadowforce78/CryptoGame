import React, { useState, useEffect } from 'react';
import CryptoChart from './CryptoChart';
import './Market.css';

const Market = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await fetch('https://api.coincap.io/v2/assets?limit=20');
                const data = await response.json();
                setCryptos(data.data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement des données');
                setLoading(false);
            }
        };

        fetchCryptos();
        const interval = setInterval(fetchCryptos, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="market-container">
            <div className="market-content">
                <h1>Crypto Market</h1>
                <div className="crypto-grid">
                    <div className="crypto-header">
                        <span>Rang</span>
                        <span>Nom</span>
                        <span>Prix</span>
                        <span>24h %</span>
                    </div>
                    {cryptos.map(crypto => (
                        <div
                            key={crypto.id}
                            className="crypto-item"
                            onClick={() => setSelectedCrypto(crypto.id)}
                        >
                            <span className="rank">{crypto.rank}</span>
                            <span className="name">
                                <div className="symbol">{crypto.symbol}</div>
                                <div className="full-name">{crypto.name}</div>
                            </span>
                            <span className="price">
                                ${parseFloat(crypto.priceUsd).toFixed(2)}
                            </span>
                            <span className={`change ${parseFloat(crypto.changePercent24Hr) >= 0 ? 'positive' : 'negative'}`}>
                                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {selectedCrypto && (
                <CryptoChart
                    cryptoId={selectedCrypto}
                    onClose={() => setSelectedCrypto(null)}
                />
            )}
        </div>
    );
};

export default Market;
