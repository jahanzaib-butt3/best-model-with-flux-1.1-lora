import * as fal from "@fal-ai/serverless-client";

const initializeFalClient = () => {
  const apiKey = import.meta.env.VITE_FAL_API_KEY;

  if (!apiKey) {
    throw new Error('FAL AI API key is missing. Please add your API key to the .env file.');
  }

  fal.config({
    credentials: apiKey,
  });
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    initializeFalClient();

    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt,
        image_size: "square_hd",
        negative_prompt: "blurry, bad quality, distorted,unreal, disfigured",
        num_inference_steps: 30,
        seed: Math.floor(Math.random() * 1000000),
      },
    });

    if (!result?.images?.[0]?.url) {
      throw new Error('No image URL in the response');
    }

    return result.images[0].url;
  } catch (error) {
    console.error('Image generation error:', error);
    if (error instanceof Error) {
      if (error.message.includes('credentials')) {
        throw new Error('Invalid FAL AI API key. Please check your .env file.');
      }
      throw error;
    }
    throw new Error('Failed to generate image. Please try again.');
  }
};