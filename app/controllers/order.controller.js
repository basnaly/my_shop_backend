const db = require("../models");
const Order = db.order;

exports.createOrder = async (req, res) => {

    try {
        const item = new Order({
            ...req.body.order,
            createUser: req.userId, 
        });

        const result = await item.save();

            res.status(200).send({
                message: "The order was created!",
            });
        }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }   
}

exports.getListOrders = async (req, res) => {

    try {
        const result = await Order.find({
            createUser: req.userId 
        }).select('_id date totalQuantity totalSum items')
        .exec()
        
        let mappedListOrders = result.map(el => {
            return {
                id: el._id,
                date: el.date,
                totalQuantity: el.totalQuantity,
                totalSum: el.totalSum,
                items: el.items
            }
        })

        res.status(200).send({
            listOrders: mappedListOrders,
        })
    }

    catch(error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}


