const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint API untuk TikTok Downloader
app.get('/api/download', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const apiURL = 'https://api.tiklydown.eu.org/api/download/v3?url=' + encodeURIComponent(url);
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch video data' });
    }
});

// Menjalankan server di port yang ditentukan oleh Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
