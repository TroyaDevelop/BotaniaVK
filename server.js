const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;

// Пример данных соседей
const neighbors = {
    '1': { name: 'Сосед 1', plants: [{ type: 'Роза', stage: 3 }] },
    '2': { name: 'Сосед 2', plants: [{ type: 'Тюльпан', stage: 5 }] }
};

io.on('connection', (socket) => {
    socket.on('disconnect', () => {});
    socket.on('updatePlant', (data) => {
        io.emit('plantUpdated', data);
    });
});

app.get('/neighbor/:id', (req, res) => {
    const neighborId = req.params.id;
    const neighborData = neighbors[neighborId] || { error: 'Сосед не найден' };
    res.json(neighborData);
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
