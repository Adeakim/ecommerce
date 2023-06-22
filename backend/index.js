const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// connect db
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// DB  user Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});
const userModel = mongoose.model("user", userSchema);

// upload product schema
const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

const productModel = mongoose.model("product", productSchema)


app.get("/", (req, res) => {
  res.status(200).send("server is running");
});
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    try {
      const result = await userModel.findOne({ email: email });
      console.log(result);
      if (result) {
        res.status(400).send({
          message: "Email already exists",
          statusCode: 400,
          alert: false
        });
      } else {
        const data = new userModel(req.body);
        const savedData = await data.save();
        res.status(201).send({
          message: "Registered successfully",
          data: savedData,
          statusCode: 201,
          alert: true
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Internal server error",
        statusCode: 500,
        alert: false
      });
    }
  });

//   login

app.post("/login", (req, res)=>{
    console.log(req.body)
    const {email, password} = req.body
    userModel.findOne({email:email}).then((result,err)=>{
        if (result){
            console.log(result)
            const data = {
                id : result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                image: result.image,
                email: result.email
            }
            res.status(200).send({
                message: "login successfully",
                alert: true,
                data
            })
        }else{
            res.status(404).send({
                message: "user not found",
                alert: false

            })
        }
    })
})
  
// CREATE PRODUCT
app.post("/product", async(req,res)=>{
    console.log(req.body)
    // const {name, image, category, description, price} = req.body
    try{
        const data = new productModel(req.body);
        const savedData = await data.save();
        res.status(201).send({
            message: "Product successfully created",
            data : savedData,
            alert: true

        })
    }catch (err){
        console.log(err.message)
        res.status(400).send({
            message: err.message,
            alert: false
        })
    }

    
})

app.get('/product', async (req, res) => {
    try {
      const data = await productModel.find({});
    //   const json_data = JSON.stringify(data);
  
      res.status(200).json({
        alert: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// app.post("/signup", async(req, res) => {
//   console.log(req.body);
//   const { email } = req.body;
//    userModel
//     .findOne({ email: email })
//     .then((err, result) => {
//       console.log(result);
//       console.log(err);
//       if (result) {
//         res.status(400).send({
//           error: "Email already exist",
//           statusCode: 400,
//         });
//       } else {
//         const data = userModel(req.body)
//         const save = data.save();
//         res.status(201).send({
//           message: "registered successfully",
//           data,
//           statusCode: 201,
//         });
//         // const save =
//       }
//     })
//     .catch((err) => console.log(err));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
