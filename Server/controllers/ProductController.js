const Product = require("../models/Product");
const fs = require("fs");

async function createRecord(req, res) {
    try {
        let data = new Product(req.body);
        if (req.files) {
            data.pic = Array.from(req.files).map((x) => x.path);
        }
        await data.save();
        let finalData = await Product.findOne({ _id: data._id })
            .populate("maincategory", ["name"])
            .populate("subcategory", ["name"])
            .populate("brand", ["name"]);
            
        res.send({
            result: "Done",
            data: finalData
        });
    } catch (error) {
        try {
            if (req.files) {
                Array.from(req.files).forEach(x => fs.unlinkSync(x.path));
            }
        } catch (e) { }

        let errorMessage = {};
        if (error.errors) {
            if (error.errors.name) errorMessage.name = error.errors.name.message;
            if (error.errors.maincategory) errorMessage.maincategory = error.errors.maincategory.message;
            if (error.errors.subcategory) errorMessage.subcategory = error.errors.subcategory.message;
            if (error.errors.brand) errorMessage.brand = error.errors.brand.message;
            if (error.errors.color) errorMessage.color = error.errors.color.message;
            if (error.errors.size) errorMessage.size = error.errors.size.message;
            if (error.errors.basePrice) errorMessage.basePrice = error.errors.basePrice.message;
            if (error.errors.discount) errorMessage.discount = error.errors.discount.message;
            if (error.errors.finalPrice) errorMessage.finalPrice = error.errors.finalPrice.message;
            if (error.errors.stockQuantity) errorMessage.stockQuantity = error.errors.stockQuantity.message;
            if (error.errors.pic) errorMessage.pic = error.errors.pic.message;
        }

        if (Object.values(errorMessage).length === 0) {
            res.status(500).send({
                result: "Fail",
                reason: "Internal Server Error"
            });
        } else {
            res.status(400).send({
                result: "Fail",
                reason: errorMessage
            });
        }
    }
}

async function getRecord(req, res) {
    try {
        let data = await Product.find().sort({ _id: -1 })
            .populate("maincategory", ["name"])
            .populate("subcategory", ["name"])
            .populate("brand", ["name"]);
            
        res.send({
            result: "Done",
            count: data.length,
            data: data,
        });
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
            .populate("maincategory", ["name"])
            .populate("subcategory", ["name"])
            .populate("brand", ["name"]);
            
        if (data) {
            res.send({
                result: "Done",
                data: data,
            });
        } else {
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function updateRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id });
        if (data) {
            const oldPics = req.body.oldPics ? req.body.oldPics.split(",").filter(x => x !== "").map(x => x.replace(/\\/g, "/")) : [];
            
            data.name = req.body.name ?? data.name;
            data.maincategory = req.body.maincategory ?? data.maincategory;
            data.subcategory = req.body.subcategory ?? data.subcategory;
            data.brand = req.body.brand ?? data.brand;
            data.color = req.body.color ?? data.color;
            data.size = req.body.size ?? data.size;
            data.basePrice = req.body.basePrice ?? data.basePrice;
            data.discount = req.body.discount ?? data.discount;
            data.finalPrice = req.body.finalPrice ?? data.finalPrice;
            data.stock = req.body.stock ?? data.stock;
            data.stockQuantity = req.body.stockQuantity ?? data.stockQuantity;
            data.description = req.body.description ?? data.description;
            data.active = req.body.active ?? data.active;

            // Delete removed pictures from filesystem
            const filesToDelete = data.pic.filter(x => !oldPics.includes(x.replace(/\\/g, "/")));
            filesToDelete.forEach(x => {
                try {
                    fs.unlinkSync(x);
                } catch (error) {
                    console.log("File deletion error:", error);
                }
            });

            // Keep only old pictures that weren't removed
            let updatedPics = data.pic.filter(x => oldPics.includes(x.replace(/\\/g, "/")));

            // Append new pictures if any
            if (req.files && req.files.length > 0) {
                updatedPics = updatedPics.concat(Array.from(req.files).map(x => x.path.replace(/\\/g, "/")));
            }
            data.pic = updatedPics;

            await data.save();

            let finalData = await Product.findOne({ _id: data._id })
                .populate("maincategory", ["name"])
                .populate("subcategory", ["name"])
                .populate("brand", ["name"]);
                
            res.send({
                result: "Done",
                data: finalData,
            });
        } else {
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }
    } catch (error) {
        console.log(error);
        try {
            if (req.files) {
                Array.from(req.files).forEach(x => fs.unlinkSync(x.path));
            }
        } catch (e) { }

        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id });
        if (data) {
            try {
                if (data.pic && Array.isArray(data.pic)) {
                    data.pic.forEach(x => {
                        try { fs.unlinkSync(x); } catch(e) {}
                    });
                }
            } catch (error) {}
            
            await data.deleteOne();
            res.send({
                result: "Done",
                data: data,
            });
        } else {
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
};
