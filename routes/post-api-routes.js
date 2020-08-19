// Requiring our models
var db = require("../models");

module.exports = function (app) {

    // Get route for getting all of the products
    app.get("/api/all_products", function (req, res) {
        var query = {};
        if (req.query.category_id) {
            query.CategoryId = req.query.category_id;
        }

        // Use include property, so [db.Category]
        db.Product.findAll({
            where: query,
            include: [db.Category]
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    // Get route for retrieving a single product
    app.get("/api/all_products/:id", function (req, res) {

        // Use include property, so [db.Category]
        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Category]
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    // POST route for saving a new post
    app.post("/api/all_products", function (req, res) {
        db.Product.create(req.body).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });


    // DELETE route for deleting posts
    app.delete("/api/all_products/:id", function (req, res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    // PUT route for updating posts
    app.put("/api/all_products", function (req, res) {
        db.Product.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbProduct) {
                res.json(dbProduct);
            });
    });

};

//End 