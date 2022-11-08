const db = require("../models");
const Cart = db.cart;

exports.updateCart = async (req, res) => {

    try {
        const result = await Cart.updateOne({
            // _id: req.query.itemId, 
            createUser: req.userId
        },
        {
            listCartItems: req.body.listCartItems,
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

exports.getCartList = async (req, res) => {

    try {
        const result = await Cart.findOne({
            createUser: req.userId 
        }).select('listCartItems').exec()

        let mappedCartList = result.listCartItems.map(el => {
            return {
                id: el._id,
                createUser: el.createUser,
                itemName: el.itemName,
                image: el.image,
                price: el.price,
                unit: el.unit,
                note: el.note,
                quantity: el.quantity,
                total: el.total
            }
        })

        res.status(200).send({
            listCartItems: mappedCartList,
        })
    }

    catch(error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong" });
    }
}


 