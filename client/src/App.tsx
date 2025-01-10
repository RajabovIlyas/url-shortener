import './App.css'
import {FormEvent, useState} from 'react';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SEVER_URL ?? 'http://localhost:3000';

function App() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!originalUrl) {
            setError('Пожалуйста, введите URL');
            return;
        }

        try {
            const response = await axios.post(`${SERVER_URL}/shorten`, {originalUrl});
            setShortUrl(`${SERVER_URL}/${response.data.shortUrl}`);
        } catch (e) {
            if (e instanceof Error) {
                setError(`Ошибка при создании короткой ссылки(${e.message})`);
            }
        }
    };

    return (
        <div>
            <h1>Сокращение URL</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Введите оригинальный URL"
                    required
                />
                <button type="submit">Сократить</button>
            </form>
            {shortUrl && (
                <div>
                    <h2>Короткая ссылка:</h2>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
            )}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default App
