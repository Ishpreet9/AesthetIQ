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
                output_format: 'webp',
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

          const base64image = Buffer.from(response.data).toString('base64');
          const resultImage = `data:image/webp;base64,${base64image}`;

          //deducting credits after successful image generation 
          user.creditBalance -= 1;
          await user.save();

          res.json({success: true, message: "Image generated",creditBalance:user.creditBalance, resultImage});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false, message:error.message})
    }
}

export {generateImage};