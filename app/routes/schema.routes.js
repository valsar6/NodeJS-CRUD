const Location = require('../models/location.model.js');
const Note = require('../models/note.model.js');


module.exports = function(app) {
    app.get('/schemas', (_req, res) => {
        res.json({
            NoteSchema: Note.schema.obj,
            LocationSchema: Location.schema.obj
        });
    });

    app.get('/routes',(_req,res) => {
        app._router.stack.forEach(function(r){
            if (r.route && r.route.path){
                res.write(r.route.stack[0].method.toUpperCase() + ' ');
                res.write(r.route.path + '\n');
            }
        });
        res.end();
    })
}