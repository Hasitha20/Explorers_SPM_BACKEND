const CSOrders = require('../models/csOrdersModel')
class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
        
        const excludedfields = ['page', 'sort', 'limit']
        excludedfields.forEach(el => delete(queryObj[el]))
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match=> '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const csOrdersCtrl = {
    getOrders: async(req, res)=>{
        try{
            console.log(req.query)
            const features = new APIfeatures(CSOrders.find(), req.query).filtering().sorting().paginating()
            const csorders = await features.query

            res.json({
                status: 'success',
                result: csorders.length,
                csorders: csorders
            })
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createOrder: async(req, res)=>{
        try{
            const {orderid, date,customerid, customername, totalPrice,itemList, status} = req.body;

           
            const newOrder = new CSOrders({
                    orderid, date, customerid, customername: customername.toLowerCase(), totalPrice, itemList, status
            })
            await newOrder.save()
            res.json({msg: "Created a order"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteOrder: async(req, res)=>{
        try{
            await CSOrders.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Order"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateOrder: async(req, res)=>{
        try{
            const {date, customerid, customername, totalPrice, status} = req.body;
           
            await CSOrders.findOneAndUpdate({_id: req.params.id}, {
                date,customerid, customername: customername.toLowerCase(), totalPrice, status
            })

            res.json({msg: "Updated a Order"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    addItemList: async (req, res) =>{
        try{
            const order = await CSOrders.findById(req.order.id);
            if(!order) return res.status(400).json({msg: "Order does not exist."})

            await CSOrders.findOneAndUpdate({_id: req.order.id}, {
                itemList: req.body.itemList
            })
            
            return res.json({msg: "Added to item list"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getSingleOrder: async(req, res) =>{
        try{
            const orderhistory = await CSOrders.find({_id: req.params.id})

            res.json(orderhistory)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    calculateAmount: async(req, res)=>{
        if(req.params && req.params.id){
            const order = await CSOrders.findById(req.params.id);
                let totalAmount = 0;
                if(order.itemList.length > 0){
                    order.itemList.map((order)=>{
                        totalAmount += order.price * order.sold;
                })
    
            }
            res.status(200).send({totalAmount:totalAmount});
        }
    }
}

module.exports = csOrdersCtrl