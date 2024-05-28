const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Book = require('./models/book');
const sequelize = require('./config/database');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Sync database
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
});

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, author, genre, published_date } = req.body;
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);

    const book = await Book.create({
      title,
      author,
      genre,
      published_date,
      file: fileData
    });

    // Delete the temporary file
    fs.unlinkSync(filePath);

    res.status(201).json({ message: 'Book uploaded successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload book' });
  }
});

// Download endpoint
app.get('/books/:id/download', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.setHeader('Content-Disposition', `attachment; filename=${book.title}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(book.file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to download book' });
  }
});

// Fetch books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
