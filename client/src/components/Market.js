import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoChart from './CryptoChart';
import './Market.css';

const Market = () => {
    const navigate = useNavigate();
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

    if (loading) return (
        <div className="loading" role="alert" aria-busy="true">
            Chargement des données du marché crypto en cours...
        </div>
    );
    
    if (error) return (
        <div className="error" role="alert">
            {error}. Veuillez réessayer plus tard.
        </div>
    );

    return (
        <main className="market-container" role="main">
            <div className="market-content">
                <div className="market-header">
                    <button 
                        className="back-button" 
                        onClick={() => navigate('/')}
                        aria-label="Retourner au menu principal"
                    >
                        ← Retour au menu
                    </button>
                    <h1 id="market-title">Marché des Cryptomonnaies</h1>
                </div>
                <div 
                    className="crypto-grid"
                    role="region"
                    aria-labelledby="market-title"
                >
                    <div className="crypto-header" role="rowheader">
                        <span>Rang</span>
                        <span>Nom</span>
                        <span>Prix</span>
                        <span>Variation 24h</span>
                    </div>
                    {cryptos.map(crypto => (
                        <button
                            key={crypto.id}
                            className="crypto-item"
                            onClick={() => setSelectedCrypto(crypto.id)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setSelectedCrypto(crypto.id);
                                }
                            }}
                            tabIndex={0}
                            aria-label={`${crypto.name} - Prix: ${parseFloat(crypto.priceUsd).toFixed(2)} dollars, Variation sur 24h: ${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`}
                        >
                            <span className="rank" aria-label={`Rang ${crypto.rank}`}>{crypto.rank}</span>
                            <span className="name">
                                <div className="symbol">{crypto.symbol}</div>
                                <div className="full-name">{crypto.name}</div>
                            </span>
                            <span className="price">
                                ${parseFloat(crypto.priceUsd).toFixed(2)}
                            </span>
                            <span 
                                className={`change ${parseFloat(crypto.changePercent24Hr) >= 0 ? 'positive' : 'negative'}`}
                                aria-label={`Variation de ${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`}
                            >
                                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            {selectedCrypto && (
                <CryptoChart
                    cryptoId={selectedCrypto}
                    onClose={() => setSelectedCrypto(null)}
                />
            )}
        </main>
    );
};

export default Market;
