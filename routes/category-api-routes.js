//Require db ..models

var db = require("../models");

module.exports = function (app) {
    // Get route for getting categories & the findAll
    app.get("/api/all_categories", function (req, res) {
        // Use include property, so [db.Product]
        db.Category.findAll({
            include: [db.Product]
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

    // Get route for getting categories & the findOne
    app.get("/api/all_categories/:id", function (req, res) {
        // Use include property, so [db.Product]
        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Product]
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

    // post route for categories 
    app.post("/api/all_categories", function (req, res) {
        db.Category.create(req.body).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

    // delete route for categories 
    app.delete("/api/all_categories/:id", function (req, res) {
        db.Category.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbCategory) {
            res.json(dbCategory);
        });
    });

};

//End