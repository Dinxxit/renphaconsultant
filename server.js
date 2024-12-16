const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const dataFile = path.join(__dirname, 'reviews.json');

// Load reviews from file
function loadReviews() {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

// Save reviews to file
function saveReviews(reviews) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(reviews, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

let reviews = loadReviews();

app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const newReview = {
    id: Date.now().toString(),
    ...req.body,
    timestamp: new Date().toISOString()
  };
  reviews.unshift(newReview);
  saveReviews(reviews);
  res.status(201).json(newReview);
});

app.delete('/api/reviews/:id', (req, res) => {
  const id = req.params.id;
  const index = reviews.findIndex(review => review.id === id);
  if (index !== -1) {
    reviews.splice(index, 1);
    saveReviews(reviews);
    res.status(204).send();
  } else {
    res.status(404).send('Review not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});