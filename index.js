require('dotenv').config();

const pkg = require('./package.json');

const path = require('path');
const mongoose = require('mongoose');
const {
  getNotes,
  addNote,
  updateNote,
  removeNote,
} = require('./notes.controller');

//const Note = require('./models/Note');

const express = require('express');
const app = express();
const port = 3000;

//Установите EJS в качестве движка представлений с помощью метода app.set():
app.set('view engine', 'ejs');
//Укажите директорию для хранения шаблонов (по умолчанию EJS ищет файлы с расширением .ejs в папке views). Если нужно изменить директорию, используйте метод app.set('views', ...)
app.set('views', './pages');

// Глобально для всех маршрутов — обязательно до ваших обработчиков
app.use(express.json());

//обслуживания статических файлов
app.use(express.static(path.resolve(__dirname, 'public')));
// app.use(express.join());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) =>
  res.render('index', {
    title: 'Notes app',
    notes: await getNotes(),
    created: false,
    error: false,
  }),
);

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title);
    res.render('index', {
      title: 'Notes app',
      notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (e) {
    console.log('Creation error', e);
    res.render('index', {
      title: 'Notes app',
      notes: await getNotes(),
      created: false,
      error: true,
    });
  }
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Notes app',
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.put('/:id', async (req, res) => {
  try {
    await updateNote({ id: req.params.id, title: req.body.title });
    res.render('index', {
      title: 'Notes app',
      notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (e) {
    console.log('Update error', e);
    res.render('index', {
      title: 'Notes app',
      notes: await getNotes(),
      created: false,
      error: true,
    });
  }
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    //await note.create({ title: 'Second note' });

    app.listen(port, () => {
      console.log(`Server has been started on port ${port} ...`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
