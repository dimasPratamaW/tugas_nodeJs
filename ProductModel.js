const { Database } = require("./DataBaseAppsUtils");
const { DataTypes } = require("sequelize");


const ProductModel = Database.define(
    "ProductModel",
    {
        product_id: {
            field: "product_id",
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        product_name: {
            field: "product_name",
            type: DataTypes.STRING,
        },
        product_picture: {
            field: "product_picture",
            type: DataTypes.STRING,
        },
        product_price: {
            field: "product_price",
            type: DataTypes.STRING,
        },
        createdAt: {
            field: "created_at",
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            field: "updated_at",
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        id_user: {
            field: "id_user",
            type: DataTypes.UUID,
        },
    },
    {
        tableName: "product",
        timestamps: false,
    },
    
);

console.log(ProductModel)


module.exports = ProductModel;
