const express = require('express');
const urls = require('./Routes');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('', urls);

app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

