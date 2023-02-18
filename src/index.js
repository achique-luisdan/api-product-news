/**  @description Used CommonJS as Module System */
const express  = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require ('uuid');

const app = express();
const port = 3001;

app.use(cors());
app.use (express.json());

let notices = [
  {
    id: '1',
    title: 'New 1',
    content: 'Content basic 1',
    category: 'Category 1',
  },
  {
    id: '2',
    title: 'New 2',
    content: 'Content basic 2',
    category: 'Category 2',
  },
  {
    id: '3',
    title: 'New 3',
    content: 'Content basic 3',
    category: 'Category 1',
  },
];

app.get('/api/notices', (req, res) => {
  res.json(notices);
});

app.get('/api/notices/:id', (req, res) => {
  const id = req.params.id;
  const notice = notices.find( notice => notice.id === id);
  if (!notice) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(notice);
});

app.post('/api/notices', (req, res) => {
  const notice = req.body;
  if (!notice || !notice.title) {
    return res.status(400).json({ message: 'Title is missing' });
  }
  if (!notice || !notice.content) {
    return res.status(400).json({ message: 'Content is missing' });
  }
  const noticeCreate = {
    id: uuidv4().slice(0, 6),
    ...notice,
  };
  notices.push (noticeCreate);
  res.status(201).json(noticeCreate);
});

app.delete ('/api/notices/:id', (req, res) => {
  const id = req.params.id;
  notices = notices.filter (notice => notice.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
