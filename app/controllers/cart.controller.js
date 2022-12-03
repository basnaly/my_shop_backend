const db = require("../models");
const Item = require("../models/item.model");
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

        const discountItems = await Item.find().gt
            ('discount.discountPrice', 0)
         console.log(discountItems)   
        
        let mappedCartList = result.listCartItems.map(el => {

            const discountItem = discountItems.find(
                (item) =>
                    el?.itemName === item?.itemName &&
                    el?.quantity >= item?.discount?.discountAmount
            );
            console.log(discountItem)

            let correctedPrice = el.price

            let correctedTotal = el.total

            if (discountItem) {

                correctedPrice = discountItem?.discount?.discountPrice /
                    discountItem?.discount?.discountAmount

                correctedTotal = correctedPrice * el?.quantity
            }

            return {
                id: el._id,
                createUser: el.createUser,
                itemName: el.itemName,
                image: el.image,
                price: correctedPrice,
                unit: el.unit,
                note: el.note,
                quantity: el.quantity,
                total: correctedTotal,
                isDiscount: !!discountItem
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


 