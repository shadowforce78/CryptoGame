import React, { useEffect, useState } from 'react';

function Market() {
    const [btcData, setBtcData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [dataSource, setDataSource] = useState(null);

    const fetchBTCData = async () => {
        try {
            setLoading(true);
            console.log('🔄 Fetching BTC data...');
            const response = await fetch('http://localhost:5000/api/btc-metadata', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('📥 Response received:', result);
            
            // Validation plus souple de la structure
            const validData = result.data || (Array.isArray(result) ? result : [result]);
            
            if (!validData || !validData.length) {
                throw new Error('No valid data received');
            }

            console.log('✅ Processed data:', validData);
            setBtcData(validData);
            setDataSource(result.source || 'api');
            setLastUpdate(new Date());
            setError(null);
        } catch (error) {
            console.error('❌ Fetch error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBTCData();
        const interval = setInterval(fetchBTCData, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const renderBTCData = () => {
        if (!btcData || btcData.length === 0) {
            return <div>No Bitcoin data available</div>;
        }
        
        const bitcoin = btcData[0];
        return (
            <div className="btc-data">
                <h3>{bitcoin.name || 'Bitcoin'} ({bitcoin.asset_id || 'BTC'})</h3>
                <div>Price USD: ${bitcoin.price_usd ? Number(bitcoin.price_usd).toFixed(2) : 'N/A'}</div>
                <div>Volume (1h): ${bitcoin.volume_1hrs_usd ? Number(bitcoin.volume_1hrs_usd).toFixed(2) : 'N/A'}</div>
                <div>Volume (24h): ${bitcoin.volume_1day_usd ? Number(bitcoin.volume_1day_usd).toFixed(2) : 'N/A'}</div>
                <div>Data Source: {dataSource || 'Unknown'}</div>
                <div className="last-update">
                    Last Update: {lastUpdate?.toLocaleString()}
                </div>
                <details>
                    <summary>Raw Data</summary>
                    <pre>{JSON.stringify(bitcoin, null, 2)}</pre>
                </details>
            </div>
        );
    };

    return (
        <div className="market-container">
            <h2>Bitcoin Market Data</h2>
            {loading && <div>Loading BTC data...</div>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !error && renderBTCData()}
        </div>
    );
}

export default Market;
