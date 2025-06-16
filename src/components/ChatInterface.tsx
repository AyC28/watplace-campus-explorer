
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic } from 'lucide-react';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    console.log('User message:', message);
    // Here we would integrate with an AI service
    setMessage('');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here we would integrate with speech recognition
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-6 z-20">
      <form onSubmit={handleSubmit}>
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="flex items-center p-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything about campus... 'Where can I study?' 'Find quiet spots' 'Show me events'"
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
            />
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                type="button"
                onClick={toggleListening}
                size="sm"
                variant="ghost"
                className={`p-2 rounded-xl ${
                  isListening 
                    ? 'bg-red-500/20 text-red-400 border border-red-400/50' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              <Button
                type="submit"
                size="sm"
                disabled={!message.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {['Find study spots', 'Show events today', 'Navigate to SLC', 'Find washrooms'].map((suggestion) => (
          <Button
            key={suggestion}
            onClick={() => setMessage(suggestion)}
            variant="ghost"
            size="sm"
            className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-full text-xs px-3 py-1"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;
