const express = require('express');
const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const { protect } = require('../middleware/authMiddleware');
const Image = require('../models/Image');
require('dotenv').config();
const router = express.Router();

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key ' + process.env.CLARIFAI_API_KEY); // Ensure you set your API key here



function predictImage(inputs){
    return new Promise((resolve,reject)=>{
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                model_id: "aaa03c23b3724a16a56b629203edc62c",
                inputs: inputs
            },
            metadata,
            (err, response) => {
                if (err) {
                   reject("Error: " + err);
                    return;
                }
        
                if (response.status.code !== 10000) {
                    reject("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }
        
             let results=[]
                for (const c of response.outputs[0].data.concepts) {
                    results.push({name:c.name,value:c.value})
                }
                resolve(results)
            }
        );
    })
}



// Analyze image
router.post('/analyze', protect, async (req, res) => {
    const { imageUrl } = req.body;
   const userId=req.user._id
    try {
        const inputs=[
            {
            data: {
                image:{
   url:imageUrl
                }
               }   }
    ]

    const results=await predictImage(inputs);
    const Analysis=new Image({user:userId,imageUrl,concepts:results})
    Analysis.save()
    return res.send({results})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error analyzing image' });
    }
});




router.get('/history', protect, async (req, res) => {
    const userId = req.user._id; // Get user ID from request

    try {
        const analyses = await Image.find({ user: userId }).sort({ createdAt: -1 }); // Fetch user's analyses, latest first
        res.json(analyses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching history' });
    }
});
module.exports = router;
