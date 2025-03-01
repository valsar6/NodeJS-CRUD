const Location = require('../models/location.model.js');

exports.create = async function(req, res) {
    // Create and Save a new Location
    if(!req.body.points) {
        res.status(400).send({message: "location can not be empty"});
    }
console.log(req.body);
    var location = new Location({location_name: req.body.location_name, points: req.body.points, emotion: req.body.emotion});
    try {
        res.send(await Location.create(location));   
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Some error occurred while creating the Location.", error: error});
    }
};

exports.findAll = async function(req, res) {
    // Retrieve and return all notes from the database.
    try {
        res.send(await Location.find().exec());
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }
};

exports.findOne = async function(req, res) {
    // Find a single note with a noteId
    try {
        res.send(await Location.findById(req.params.noteId).exec());
    }
    catch (error) {
        res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }
};

exports.findLocation = function(req, res, next) {
  var limit = req.query.limit || 10;

      // get the max distance or set it to 8 kilometers
      var maxDistance = req.query.distance || 8;

      // we need to convert the distance to radians
      // the raduis of Earth is approximately 6371 kilometers
      maxDistance /= 6371;

      // get coordinates [ <longitude> , <latitude> ]
      var coords = [];
      coords[0] = parseFloat(req.query.longitude) || 0;
      coords[1] = parseFloat(req.query.latitude) || 0;

      // find a location
      try {
        res.send(Location.aggregate(
            [{
          $geoNear: {
           near: { type: "Point", coordinates: coords }, 
           distanceField: "dist.calculated",
           includeLocs: "dist.location",
           spherical: true
            }
            }]).limit(limit).exec());
      } catch (error) {
        res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
      }

};

exports.update = async function(req, res) {
    // Update a note identified by the noteId in the request
    try {
        res(await Location.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, {new: true}).exec());
    }
    catch (error) {
        res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }

};

exports.delete = async function(req, res) {
    // Delete a note with the specified noteId in the request
    try {
        res.send(await Location.findByIdAndRemove(req.params.noteId).exec());
    }
    catch(error) {
        res.status(500).send({message: "Some error occurred while retrieving notes.", error: error});
    }
};
