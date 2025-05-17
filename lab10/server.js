const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Пути к файлам данных
const dataDir = path.join(__dirname, 'data');
const originalFile = path.join(dataDir, 'original.txt');
const processedFile = path.join(dataDir, 'processed.txt');

// Создаем папку data если ее нет
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Обработка имен
function processNames(names) {
    const corrected = names.map(name => {
        if (!name) return name;
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
    const sorted = [...corrected].sort((a, b) => a.localeCompare(b));
    return { original: names, processed: sorted };
}

// Маршруты
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/process', (req, res) => {
    const names = req.body.names.split('\n').filter(name => name.trim());
    
    // Сохраняем оригинальные имена
    fs.writeFileSync(originalFile, names.join('\n'));
    
    // Обрабатываем и сохраняем
    const result = processNames(names);
    fs.writeFileSync(processedFile, result.processed.join('\n'));
    
    res.json({ success: true });
});

app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'result.html'));
});

app.get('/data', async (req, res) => {
    try {
        const original = fs.readFileSync(originalFile, 'utf8').split('\n').filter(name => name);
        const processed = fs.readFileSync(processedFile, 'utf8').split('\n').filter(name => name);
        res.json({ original, processed });
    } catch (err) {
        res.json({ original: [], processed: [] });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});