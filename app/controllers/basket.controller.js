const db = require("../models");
const Basket = db.basket;

exports.addNewBasketItem = async (req, res) => {

    try {
        const basket = new Basket({
            ...req.body.basket,
            createUser: req.userId, 
        });

        const result = await basket.save();

            res.status(200).send({
                message: "The basket item was created!",
            });
        }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }   
}

exports.getListBasketItems = async (req, res) => {

    try {
        const result = await Basket.find({
            createUser: req.userId 
        }).select('_id createUser itemName image price unit note quantity')
        .exec()

        let mappedListBasketItems = result.map(el => {
            return {
                id: el._id,
                createUser: el.createUser,
                itemName: el.itemName,
                image: el.image,
                price: el.price,
                unit: el.unit,
                note: el.note,
                quantity: el.quantity
            }
        })

        res.status(200).send({
            listItems: mappedListBasketItems,
        })
    }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}

// exports.deleteItem = async (req, res) => {

//     try {
//         const result = await Item.deleteOne({
//             _id: req.query.itemId, 
//             // createUser: req.userId
//         })

//         console.log(result)

//         if (result.deletedCount === 1) {
//             res.status(200).send({
//                 message: 'The item was deleted!'})
//         } else {
//             res.status(500).send('Nothing was deleted!')
//         }
//     }

//     catch(error) {
// 		res.status(500).send({ message: "Something went wrong" });
//     } 
// }


// exports.saveEditedItem = async (req, res) => {

//     try {
//         const result = await Item.updateOne({
//             _id: req.query.itemId, 
//             createUser: req.userId
//         },
//         {
//             ...req.body.item,
//             createUser: req.userId
//         })

//         if (result.modifiedCount === 1) {
//             res.status(200).send({
//                 message: 'Item was updated!'
//             })
//         } else {
//             res.status(400).send({
//                 message: 'Nothing was updated!'
//             })
//         }    
//     }

//     catch(error) {
//         res.status(500).send({ message: "Something went wrong" });
//     }
// }