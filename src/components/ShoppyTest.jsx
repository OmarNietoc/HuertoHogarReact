import { useState, useEffect } from 'react';
import { shoppyService } from '../services/shoppyService';

const ShoppyTest = () => {
    const [status, setStatus] = useState('Checking connection...');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const testConnection = async () => {
            try {
                // Intentamos obtener productos como prueba
                const result = await shoppyService.getProducts();
                setStatus('Connected successfully!');
                setData(result);
            } catch (err) {
                setStatus('Connection failed');
                setError(err.message);
            }
        };

        testConnection();
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
            <h2>Shoppy Backend Connection Test</h2>
            <p><strong>Status:</strong> {status}</p>
            {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
            {data && (
                <div>
                    <h3>Data received:</h3>
                    <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ShoppyTest;
