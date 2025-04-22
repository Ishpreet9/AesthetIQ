import cloudinary from "../config/cloudinary.js";
import userModel from "../models/userModel.js";
import axios from 'axios';

const generateImage = async (req,res) => {
    try {
          const userId = req.userId;
          const {prompt, style, aspectRatio} = req.body;
          const user = await userModel.findById(userId);
          let stylePrompt = '';
          if(style==='anime')
          {
            stylePrompt = 'An anime style image. ';
          }
          else if(style==='ghibli')
          {
            stylePrompt = 'A studio ghibli style image. ';
          }
          else if(style==='realistic')
          {
            stylePrompt = 'A very realistic image. ';
          }
          else if(style==='logo')
          {
            stylePrompt = 'A minimalist style logo. ';
          }

          const finalPrompt = stylePrompt+prompt;

          if(!user || !prompt)
          {
            return res.status(400).json({success:false, message:'Missing details'})
          }

          if(user.creditBalance===0)
          {
            return res.status(403).json({success:false, message: 'Not enough credits', creditBalance: user.creditBalance});
          }

          console.log(finalPrompt);

          const response = await axios.postForm(
            'https://api.stability.ai/v2beta/stable-image/generate/ultra',
            {
                prompt: finalPrompt,
                output_format: 'png',
                aspect_ratio: aspectRatio
            },
            {
                validateStatus: ()=>true,
                responseType: 'arraybuffer',
                headers: {
                    Authorization: `Bearer ${process.env.DREAM_STUDIO_API}`,
                    Accept: "image/*"
                }
            }
          );

          if(response.status != 200)
          {
            return res.status(502).json({success:false, message:'Failed to generate image', details:response.data.toString()});
          }

          // const base64image = Buffer.from(response.data).toString('base64');
          // const resultImage = `data:image/png;base64,${base64image}`;

          //convert ArrayBuffer to Buffer
          const imageBuffer = Buffer.from(response.data);

          const result = await new Promise((resolve,reject)=>{
            const uploadStream = cloudinary.uploader.upload_stream(
              { 
                resource_type: 'image',
                folder: 'generated_images'
              }, (error, result) =>{
                if(error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(imageBuffer);
          });

          const imageUrl = result.secure_url;

          //saving the imageUrl and prompt 
          const imageData = {url: imageUrl, prompt: prompt, style: style, ratio: aspectRatio};
          user.images.push(imageData);

          //deducting credits after successful image generation 
          user.creditBalance -= 1;
          await user.save();

          return res.status(200).json({success: true, message: "Image generated",creditBalance:user.creditBalance, imageData});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false, message:error.message});
    }
}

const getAllImages = async (req,res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if(!user)
    {
      return res.status(400).json({success:false, message:'Missing details'})
    }
    else
    {
      const imagesData = user.images;
      return res.status(200).json({success:true, imagesData});
    }
  } catch (error) {
    return res.status(500).json({success:false, message:error.message});
  }
}

const addBookmark = async (req,res) => {
  try {
    const userId = req.userId;
    const {imageUrl} = req.body;
  
    const user = await userModel.findById(userId);
    if(!user)
    {
      return res.status(400).json({success:false, message:'Missing details'}); 
    }
    const image = user.images.find(img => img.url === imageUrl);
    if(!image)
    {
      return res.status(404).json({success:false, message:'Image not found'});
    }
    image.bookmark = true;
    await user.save();
    return res.status(200).json({success:true, message:'Image Bookmarked'})
  } catch (error) {
    return res.status(500).json({success:false, message:error.message});
  }
}

const removeBookmark = async (req,res) => {
  try {
    const userId = req.userId;
    const {imageUrl} = req.body;
  
    const user = await userModel.findById(userId);
    if(!user)
    {
      return res.status(400).json({success:false, message:'Missing details'}); 
    }
    const image = user.images.find(img => img.url === imageUrl);
    if(!image)
    {
      return res.status(404).json({success:false, message:'Image not found'});
    }
    image.bookmark = false;
    await user.save();
    return res.status(200).json({success:true, message:'Bookmark Removed'})
  } catch (error) {
    return res.status(500).json({success:false, message:error.message});
  }
}

export {generateImage, getAllImages, addBookmark, removeBookmark};