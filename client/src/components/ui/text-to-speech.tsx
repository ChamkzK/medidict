import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TextToSpeechProps {
  text: string;
  className?: string;
}

export function TextToSpeech({ text, className }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const speak = () => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set rate slightly slower for medical terms
      utterance.rate = 0.9;
      
      // Event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        setIsSpeaking(false);
        toast({
          variant: "destructive",
          title: "Speech failed",
          description: "Could not play the audio. Please try again."
        });
      };
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        variant: "destructive",
        title: "Not supported",
        description: "Your browser doesn't support text-to-speech functionality."
      });
    }
  };

  return (
    <Button
      onClick={speak}
      variant="default"
      size="icon"
      className={`rounded-full bg-primary hover:bg-primary-dark transition-colors ${className || ''} w-10 h-10`}
      aria-label="Listen to pronunciation"
    >
      <div className="flex items-center space-x-0.5">
        <div className={`h-3 w-0.5 bg-white rounded-full ${isSpeaking ? 'animate-pulse' : ''}`}></div>
        <div className={`h-4 w-0.5 bg-white rounded-full ${isSpeaking ? 'animate-pulse delay-75' : ''}`}></div>
        <div className={`h-2 w-0.5 bg-white rounded-full ${isSpeaking ? 'animate-pulse delay-150' : ''}`}></div>
        <div className={`h-3 w-0.5 bg-white rounded-full ${isSpeaking ? 'animate-pulse delay-200' : ''}`}></div>
      </div>
    </Button>
  );
}
