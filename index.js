const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the Express server!');
});

app.post('/generate-story', (req, res) => {
    // Call the Python script here
    exec('python3 ptcharlie_script.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Failed to generate story');
        }
        // Send back the result from the Python script
        res.send(stdout);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
