const Note = require('../models/note.model.js');

exports.create = async function(req, res) {
    try {
        var note = new Note({title: req.body.title || "Untitled Note", content: req.body.content});
        res.send(await Note.create(note));
    } catch (error) {
        res.status(500).send({message: "Some error occurred while creating the Note.", error: error});
    }
};

exports.findAll = async function(req, res) {
    // Retrieve and return all notes from the database.
    try {
        res.send(await Note.find().exec());
    }
    catch(error) {
        res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }
};

exports.findOne = async function(req, res) {
    // Find a single note with a noteId
    try {
        res.send(await Note.findById(req.params.noteId).exec());
    }
    catch(error) {
        res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }
};

exports.update = async function(req, res) {
    // Update a note identified by the noteId in the request
    try{
    res(await Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true}).exec());
    }
    catch(error) {
    res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }
};

exports.delete = async function(req, res) {
    try {
    // Delete a note with the specified noteId in the request
    res.send(await Note.findByIdAndRemove(req.params.noteId).exec());
    }
    catch(error) {
    res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }
};

