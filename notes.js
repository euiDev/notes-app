const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)
  if(!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green('New note added!'))
  } else {
    console.log(chalk.red('Note already exists'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const noteToRemove = notes.find(note => note.title === title)

  if(noteToRemove) {
    const remainingNotes = notes.filter(note => note.title !== title)
    saveNotes(remainingNotes)
    console.log(chalk.green('Note has been deleted'))
  } else {
    console.log(chalk.red('Note doesn\'t exists'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  if (notes.length === 0)
    return console.log(chalk.red('No notes to list'))
  console.log(chalk.yellow('Listing out all notes'))
  notes.forEach(note => console.log(chalk.green(note.title)))
}

const readNote = title => {
  const notes = loadNotes()
  const noteToRead = notes.find(note => note.title === title)

  if(noteToRead) {
    console.log(chalk.green(noteToRead.title))
    console.log(noteToRead.body)
  } else {
    console.log(chalk.red('Note doesn\'t exists'))
  }
}

const saveNotes = notes => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
  try {
    const data = fs.readFileSync('notes.json').toString()
    return JSON.parse(data)
  } catch(e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}