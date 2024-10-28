import React, { useState } from 'react';
import { generateImage } from '../utils/falClient';
import { Loader2, AlertCircle } from 'lucide-react';

interface ImageGeneratorProps {
  setGeneratedImage: (image: string | null) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ setGeneratedImage }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate image';
      setError(errorMessage);
      console.error('Image generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="w-full space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-200 mb-2">
          Enter your prompt:
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm 
                   text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y"
          placeholder="A serene landscape with mountains at sunset..."
          disabled={loading}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="text-red-500 shrink-0" size={20} />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !prompt.trim()}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Generating Image...
          </>
        ) : (
          'Generate Image'
        )}
      </button>
    </form>
  );
};

export default ImageGenerator;