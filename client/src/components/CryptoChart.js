import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CryptoChart = ({ cryptoId, onClose }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${cryptoId}/history?interval=h1`);
        const result = await response.json();
        const formattedData = result.data.map(item => ({
          time: new Date(item.time).toLocaleTimeString(),
          price: parseFloat(item.priceUsd).toFixed(2)
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history:', error);
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [cryptoId]);

  if (loading) return <div className="chart-loading">Chargement du graphique...</div>;

  return (
    <div className="chart-overlay">
      <div className="chart-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Évolution sur 24h</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoChart;
