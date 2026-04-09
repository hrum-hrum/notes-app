//const { readFile, writeFile } = require('fs/promises');
//const path = require('path');
//const filePath = path.join(__dirname, 'db.json');

const Note = require('./models/Note');

// function normalizeNotes(data) {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   if (data && typeof data === 'object') {
//     return Object.values(data);
//   }

//   return [];
// }

// async function getNotes() {
//   try {
//     const data = await readFile(filePath, 'utf8');
//     return data.trim() ? normalizeNotes(JSON.parse(data)) : [];
//   } catch (error) {
//     if (error.code === 'ENOENT') {
//       return [];
//     }

//     throw error;
//   }
// }

async function getNotes() {
  const notes = await Note.find();

  //console.log('Notes retrieved:', notes);
  // return notes.map((note) => ({
  //   id: note._id.toString(),
  //   title: note.title,
  // }));

  return notes;
}

// async function addNote(title) {
//   const notes = await getNotes();

//   const note = {
//     id: Date.now().toString(),
//     title,
//   };

//   notes.push(note);
//   await writeFile(filePath, JSON.stringify(notes, null, 2));

//   console.log('Note added:', note);
//   return note;
// }

async function addNote(title) {
  await Note.create({ title });
  console.log('Note added:');
}

// async function removeNote(id) {
//   const notes = await getNotes();

//   const updatedNotes = notes.filter((note) => note.id !== id);
//   await writeFile(filePath, JSON.stringify(updatedNotes, null, 2));

//   console.log(`Note with id ${id} removed`);
// }

async function removeNote(id) {
  await Note.deleteOne({ _id: id });
  console.log(`Note with id ${id} removed`);
}

// async function updateNote(data) {
//   const notes = await getNotes();
//   const index = notes.findIndex((note) => note.id === data.id);
//   if (index >= 0) {
//     notes[index] = { ...notes[index], ...data };
//     await saveNotes(notes);
//     console.log('Note has been updated!');
//   }
// }

async function updateNote(data) {
  console.log('Updating note with data:', data);
  //await Note.updateOne({ _id: data.id }, { title: data.title });
}

module.exports = {
  getNotes,
  addNote,
  updateNote,
  removeNote,
};
