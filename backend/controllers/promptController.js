import axios from 'axios';

const enhancePrompt = async (req,res) => {
    try {
        const { prompt } = req.body;
        if(!prompt)
        {
            return res.status(400).json({success:false, message:'Missing prompt details'});
        }
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {role: 'system', content: 'You are a prompt enhancer for AI image generation. You return only the final improved prompt and nothing else without writing it in double quotes'},
                    {role: 'user', content:`Improve this prompt for image generation: ${prompt}`}
                ],
                temperature: 0.7,
                max_tokens: 250
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_LLM_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        const enhancedPrompt = response.data.choices[0].message.content;
        res.status(200).json({success:true, message:'Prompt Enhanced', enhancedPrompt: enhancedPrompt});
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}

const randomPrompt = async (req,res) => {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {role: 'system', content: 'You are a prompt generator for AI image generation. You generate random creative and unique prompts for image generation and nothing else as output without writing it in double quotes. You write it different and unique each time.'},
                    {role: 'user', content:`Generate a random prompt for AI image generation. Write it unique`}
                ],
                temperature: 0.7,
                max_tokens: 250
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_LLM_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        const generatedPrompt = response.data.choices[0].message.content;
        res.status(200).json({success:true, message:'Prompt Generated', generatedPrompt: generatedPrompt});
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}

export {enhancePrompt, randomPrompt};