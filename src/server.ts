import express, { Request, Response } from 'express';
import { books, getBooksByTitle, getBooksByIds, addOrUpdateBook } from './service/libraryService';

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library!');
});

app.get('/books', (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title as string;
        const filteredBooks = getBooksByTitle(title);
        res.json(filteredBooks);
    } else {
        res.json(books);
    }
});

app.get('/books/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = getBooksByIds(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/books', (req: Request, res: Response) => {
    const newBook = req.body;
    const result = addOrUpdateBook(newBook);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400).send('Invalid book');
    }
});
