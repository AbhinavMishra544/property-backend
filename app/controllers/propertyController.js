const Property = require('../models/property');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    fetchPropertyList: async (req, res) => {
        try {
            Property.find({ isDeleted : false },{address:1,bedroom:1,bathroom:1,description:1,_id:1}, async (error, propertyList) => {
                if (error) {
                    return res.json({
                        "status": "error",
                        "msg": "error encountered"
                    })
                }
                else{
                    return res.json({
                        "status" : "success",
                        "data" : propertyList,
                        "msg" : "property list fetched successfully"
                    })
                }
            })
            
        }
        catch (err) {
            console.log(err,"err----------------------");
            res.json({
                "status": "error",
                "msg": "some error occurred"
            })
        }
    },
    addProperty : async (req, res) => {
        try {
            console.log("addproperty---------------");
                console.log("vhai ------------");
                const { address , description , bedroom , bathroom } = req.body;
                const propertyDetails = {
                    address : address,
                    bedroom  : bedroom,
                    bathroom : bathroom,
                    description : description
                }
                console.log("kaafi aagey");
                let propertyObject = new Property(propertyDetails);
                propertyObject.save(function (err, saved) {
                    if (err) {
                        console.log(err,"err-----------------");
                        return res.json({
                            "status": "error",
                            "msg": "error encountered"
                        })
                    } else {
                        return res.json({
                            "status": "success",
                            "msg": "property saved"
                        })
                    }
                })
        } catch (error) {
            console.log(error)
            res.json({
                "status": "error",
                "msg": 'error encountered'
            });
        }
    },
    editProperty : async (req, res) => {
        try {
                const { propertyId , address , description , bedroom , bathroom } = req.body; 
            if((typeof (bedroom) != Number) || (typeof (bathroom) != Number)){
                return res.json({
                    status : "error",
                    msg : "Invalid inputs.Bedroom and bathroom should be numeric" 
                })
            }
                const modifiedProperty = await Property.findOneAndUpdate({$and : [ {_id : ObjectId(propertyId)} , { isDeleted : false } ]}, { $set: {address : address , bedroom : bedroom , bathroom : bathroom , description : description } } , {new : true});

                if(modifiedProperty){
                    return res.json({
                        status : "success",
                        data : modifiedProperty,
                        msg : `property successfully updated`
                    })
                }
                else{
                    res.json({
                        status : "error",
                        msg : "Some Error occurred." 
                    })
                }

        } catch (error) {
            console.log(error)
            res.json({
                "status": "error",
                "msg": 'error encountered'
            });
        }
    },
    deleteProperty : async (req, res) => {
        try {
                const { propertyId , address , description , bedroom , bathroom } = req.body; 

                const modifiedProperty = await Property.findOneAndUpdate({$and : [ {_id : ObjectId(propertyId)} , { isDeleted : false } ]}, { $set: { isDeleted : true } } , {new : true});

                if(modifiedProperty){
                    return res.json({
                        status : "success",
                        data : modifiedProperty,
                        msg : `property successfully updated`
                    })
                }
                else{
                    res.json({
                        status : "error",
                        msg : "Some Error occurred." 
                    })
                }

        } catch (error) {
            console.log(error)
            res.json({
                "status": "error",
                "msg": 'error encountered'
            });
        }
    }
}