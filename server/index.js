const express = require('express');
const urls = require('./Routes');
const app = express();

app.use(express.json());
app.use('', urls);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

