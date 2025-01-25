const mongoose = require('mongoose');
const mongoURI = "mongodb://gofood:mern1234@ac-bjxvb6c-shard-00-00.zpvibgo.mongodb.net:27017,ac-bjxvb6c-shard-00-01.zpvibgo.mongodb.net:27017,ac-bjxvb6c-shard-00-02.zpvibgo.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-2c013d-shard-0&authSource=admin&retryWrites=true&w=majority&appName=AtlasApp"
const mongoDB = async () => {

    await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
        if (err) console.log("--error", err);
        else {
            console.log("connected");
            const fetched_data = mongoose.connection.db.collection("food_items")
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory= catData;

                    }
                })
                // if(err)console.log(err);
                // else{
                //     global.food_items=data;

                // }
            })
        }
    })
}
module.exports = mongoDB;
