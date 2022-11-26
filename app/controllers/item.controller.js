const db = require("../models");
const Item = db.item;

exports.createNewItem = async (req, res) => {

    try {
        const item = new Item({
            ...req.body.item,
            createUser: req.userId, 
        });

        const result = await item.save();

            res.status(200).send({
                message: "The item was created!",
            });
        }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }   
}

exports.getListItems = async (req, res) => {

    try {
        const result = await Item.find({
            // createUser: req.userId 
        }).select('_id createUser category outOfStock itemName image price unit note discount')
        .exec()

        let mappedListItems = result.map(el => {
            return {
                id: el._id,
                createUser: el.createUser,
                category: el.category,
                outOfStock: el.outOfStock,
                itemName: el.itemName,
                image: el.image,
                price: el.price,
                unit: el.unit,
                note: el.note,
                discount: el.discount
            }
        })

        res.status(200).send({
            listItems: mappedListItems,
        })
    }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}

exports.deleteItem = async (req, res) => {

    try {
        const result = await Item.deleteOne({
            _id: req.query.itemId, 
            createUser: req.userId
        })

        if (result.deletedCount === 1) {
            res.status(200).send({
                message: 'The item was deleted!'})
        } else {
            res.status(500).send('Nothing was deleted!')
        }
    }

    catch(error) {
		res.status(500).send({ message: "Something went wrong" });
    } 
}


exports.saveEditedItem = async (req, res) => {

    try {
        const result = await Item.updateOne({
            _id: req.query.itemId, 
            createUser: req.userId
        },
        {
            ...req.body.item,
            createUser: req.userId
        })

        if (result.modifiedCount === 1) {
            res.status(200).send({
                message: 'Item was updated!'
            })
        } else {
            res.status(400).send({
                message: 'Nothing was updated!'
            })
        }    
    }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}