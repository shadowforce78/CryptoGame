import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user }) => {
    const navigate = useNavigate();

    // Mock data - À remplacer par les vraies données de l'utilisateur
    const userInfo = {
        username: user?.username || "User",
        email: "user@example.com",
        wallet: {
            USD: 10000,
            BTC: 0.5,
            ETH: 2.0
        },
        joinDate: "2023-01-01",
        totalTrades: 42,
        profitLoss: "+15.5%"
    };

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
                            <span>{userInfo.username}</span>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <span>{userInfo.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Date d'inscription</label>
                            <span>{userInfo.joinDate}</span>
                        </div>
                    </div>
                </section>

                <section className="wallet-section">
                    <h2>Porte-monnaie</h2>
                    <div className="wallet-grid">
                        {Object.entries(userInfo.wallet).map(([currency, amount]) => (
                            <div key={currency} className="wallet-item">
                                <label>{currency}</label>
                                <span>{amount.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="stats-section">
                    <h2>Statistiques Trading</h2>
                    <div className="stats-grid">
                        <div className="stats-item">
                            <label>Trades totaux</label>
                            <span>{userInfo.totalTrades}</span>
                        </div>
                        <div className="stats-item">
                            <label>Profit/Perte</label>
                            <span className={userInfo.profitLoss.startsWith('+') ? 'positive' : 'negative'}>
                                {userInfo.profitLoss}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};
export default Profile;
