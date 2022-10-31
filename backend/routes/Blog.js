const router = require("express").Router();
const Data = require("../models/Data");


// create new post
router.post("/blog/addblog", async (req, res) => {
  // console.log(req.body)
  try {
    const userName = req.body.userName;
    const message = req.body.message;
    const comment = {};
  
    // console.log(useName,message,comment)
    const data = new Data({ userName, message, comment });
    data.save();
    res.json({
      status: "success",
      data: data,
      message: "post added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// get posts with pagination
router.get("/blogs", async (req, res) => {
  try {
    const { page = 1, limit = 25 } = req.query;
    let data = await Data.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({
      status: "sucess",
      data: await data,
    });
  } catch (err) { 
    res.status(500).json({
      error: err,
    });
  }
});

// get post by id
router.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await Data.find({_id:id});

    res.json({
      status: "sucess",
      data: await data,
    });
  } catch (err) { 
    res.status(500).json({
      error: err,
    });
  }
});

// get all posts
router.get("/allBlogs", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await Data.find();

    res.json({
      status: "sucess",
      data: await data,
    });
  } catch (err) { 
    res.status(500).json({
      error: err,
    });
  }
});


// adding comments
router.put("/blog/:id", async (req, res) => {
 
  try {
    const id = req.params.id;
    let comment=req.body.comment
    let name=req.body.name
    const prevdata = await Data.findOne( {_id:id} );
    console.log(prevdata.userName);
    let newcomment={};
    if(!prevdata.comment){
      newcomment[1] = [comment,name]
    }else{
        newcomment=prevdata.comment;
        console.log(Object.keys(newcomment).length)
        let size=Object.keys(newcomment).length+1
        newcomment[size+1] = [comment,name];
        console.log(newcomment)
    }
    console.log(newcomment);

    const data = await Data.findByIdAndUpdate({_id:id},{comment:newcomment} );
    res.json({
      status:"success",
      result: data,
      message: "comment added",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});


// extra route just to deletes all post 
router.delete("/blogs", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await Data.remove( { } );

    res.json({
      status: "sucess",
      data: await data,
    });
  } catch (err) { 
    res.status(500).json({
      error: err,
    });
  }
});
module.exports = router;
