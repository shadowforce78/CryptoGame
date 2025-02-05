import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user }) => {
    const navigate = useNavigate();

    const calculateProfitLoss = (trades) => {
        if (!trades || trades.length === 0) return "+0%";
        
        let totalInvestment = 0;
        let currentValue = 0;
        
        trades.forEach(trade => {
            if (trade.type === 'buy') {
                totalInvestment += trade.amount * trade.price;
            } else {
                currentValue += trade.amount * trade.price;
            }
        });

        const profitLoss = ((currentValue - totalInvestment) / totalInvestment) * 100;
        return `${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}%`;
    };

    // Vérification si l'utilisateur ou ses données sont undefined
    if (!user) {
        return (
            <div className="loading" role="alert">
                Chargement des données utilisateur...
            </div>
        );
    }

    return (
        <main className="profile-container">
            <div className="profile-header">
                <button
                    className="back-button"
                    onClick={() => navigate('/')}
                    aria-label="Retourner au menu principal"
                >
                    ← Retour
                </button>
                <h1>Profil Utilisateur</h1>
            </div>

            <div className="profile-content">
                <section className="user-info-section">
                    <h2>Informations Personnelles</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Nom d'utilisateur</label>
                            <span>{user.username || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <span>{user.email || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <label>Date d'inscription</label>
                            <span>{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                </section>

                <section className="wallet-section">
                    <h2>Porte-monnaie</h2>
                    <div className="wallet-grid">
                        {user.wallet ? (
                            <>
                                <div className="wallet-item">
                                    <label>USD</label>
                                    <span>${Number(user.wallet.USD).toFixed(2)}</span>
                                </div>
                                <div className="wallet-item">
                                    <label>Bitcoin (BTC)</label>
                                    <span>{Number(user.wallet.BTC).toFixed(8)}</span>
                                </div>
                                <div className="wallet-item">
                                    <label>Ethereum (ETH)</label>
                                    <span>{Number(user.wallet.ETH).toFixed(8)}</span>
                                </div>
                            </>
                        ) : (
                            <div className="wallet-item">
                                <span>Aucune donnée disponible</span>
                            </div>
                        )}
                    </div>
                </section>

                <section className="stats-section">
                    <h2>Statistiques Trading</h2>
                    <div className="stats-grid">
                        <div className="stats-item">
                            <label>Trades totaux</label>
                            <span>{user.trades?.length || 0}</span>
                        </div>
                        <div className="stats-item">
                            <label>Profit/Perte</label>
                            <span className={calculateProfitLoss(user.trades).startsWith('+') ? 'positive' : 'negative'}>
                                {calculateProfitLoss(user.trades)}
                            </span>
                        </div>
                        <div className="stats-item">
                            <label>Dernier trade</label>
                            <span>
                                {user.trades && user.trades.length > 0
                                    ? new Date(user.trades[user.trades.length - 1].date).toLocaleDateString()
                                    : 'Aucun trade'}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Profile;
