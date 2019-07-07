module.exports = function (sequelize, DataTypes) {
    const Item = sequelize.define("Item", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        item_UPC: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shelf_life: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["In Use", "New", "History", "Wish List"]],
                }
            }
        },
        expiry_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: {
                    args: [["Makeup", "Skincare", "Hair", "Fragrance", "Other"]]
                }
            }
        },
        label: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.NUMERIC(4, 2),
            allowNull: true,
            validate: {
                min: 0
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        previously_used: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Item.associate = function (models) {
        // We're saying that an Item should belong to a User
        // An Item can't be created without a User due to the foreign key constraint
        Item.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Item;
};
