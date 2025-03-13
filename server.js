const express = require('express');
const app = express();
const PORT = 3000;

// Пример данных соседей
const neighbors = {
    '1': { name: 'Сосед 1', plants: [{ type: 'Роза', stage: 3 }] },
    '2': { name: 'Сосед 2', plants: [{ type: 'Тюльпан', stage: 5 }] }
};

app.get('/neighbor/:id', (req, res) => {
    const neighborId = req.params.id;
    const neighborData = neighbors[neighborId] || { error: 'Сосед не найден' };
    res.json(neighborData);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
