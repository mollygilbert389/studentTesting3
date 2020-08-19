//exporting sequelize //

module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Product.associate = function (models) {
        //Product should belong to an category
        // A Product will need to be linked to a category for organization purposes

        Product.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Product;
};