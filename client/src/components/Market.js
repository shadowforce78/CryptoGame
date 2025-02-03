import React, { useEffect, useState } from 'react';

function Market() {
    const [btcData, setBtcData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBTCData = async () => {
            try {
                console.log('Fetching BTC data from API...');
                const response = await fetch('http://localhost:5000/api/btc-metadata', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Received data:', data);
                setBtcData(data);
            } catch (error) {
                console.error('Detailed fetch error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBTCData();
    }, []);

    if (loading) return <div>Loading BTC data...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!btcData) return <div>No data available (btcData is {JSON.stringify(btcData)})</div>;

    return (
        <div className="market-container">
            <h2>Bitcoin Market Data</h2>
            <pre>{JSON.stringify(btcData, null, 2)}</pre>
        </div>
    );
}

export default Market;
