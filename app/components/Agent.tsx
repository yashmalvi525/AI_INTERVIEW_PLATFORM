"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface AgentProps {
  userName: string;
  userId: string;
  type: string;
}

interface SavedMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Message {
  role: string;
  transcript: string;
  transcriptionType: string;
}

function Agent({ userName, userId, type }: AgentProps) {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setError(null);
    };
  
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };
  
    const onMessage = (message: Message) => {
      if (message.role === 'transcript' && message.transcriptionType === 'final') {
        const newMessage: SavedMessage = {
          role: message.role as 'user' | 'assistant' | 'system',
          content: message.transcript,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
  
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
  
    const onError = (error: Error) => {
      const message = error.message || '';
  
      const isNormalEnd =
        message.includes('Meeting ended due to ejection') ||
        message.includes('Meeting has ended');
  
      if (isNormalEnd) {
        console.log('✅ Call ended gracefully');
        setCallStatus(CallStatus.FINISHED);
        setError(null);
      } else {
        console.error('❌ Error during call:', error);
        setCallStatus(CallStatus.INACTIVE);
        setError(message || 'An error occurred during the call');
      }
    };
  
    // Register event listeners
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);
  
    // Cleanup
    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      const timer = setTimeout(() => {
        router.push('/interview');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [callStatus, router]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    setError(null);

    try {
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
      const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

      if (!assistantId && !workflowId) {
        throw new Error('VAPI configuration not found.');
      }

      const targetId = assistantId || workflowId;

      await vapi.start(targetId!, {
        variableValues: {
          userName,
          userId,
          interviewType: type,
        },
      });
    } catch (error) {
      console.error('Error starting call:', error);
      setError(error instanceof Error ? error.message : 'Failed to start the call');
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const disconnectCall = async () => {
    try {
      await vapi.stop();
      setCallStatus(CallStatus.FINISHED);
    } catch (error) {
      console.error('Error stopping call:', error);
    }
  };

  const latestMessage = messages[messages.length - 1]?.content || '';
  const isCallInactiveOrFinished = [CallStatus.INACTIVE, CallStatus.FINISHED].includes(callStatus);

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="AI Interviewer" height={54} width={65} />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User Avatar"
              height={540}
              width={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p className={cn("transition-opacity duration-500 opacity-100")}>
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      {callStatus === CallStatus.FINISHED && (
        <div className="text-center text-green-600 mb-4">
          <p>Interview completed! Redirecting...</p>
        </div>
      )}

      <div className="w-full flex justify-center mt-6">
        {callStatus === CallStatus.ACTIVE ? (
          <button className="btn-disconnect" onClick={disconnectCall}>
            End
          </button>
        ) : (
          <button
            className="relative btn-call"
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING || callStatus === CallStatus.FINISHED}
          >
            {callStatus === CallStatus.CONNECTING && (
              <span className="absolute animate-ping rounded-full opacity-75" />
            )}
            <span>
              {callStatus === CallStatus.CONNECTING
                ? '. . .'
                : callStatus === CallStatus.FINISHED
                ? 'Completed'
                : 'Call'}
            </span>
          </button>
        )}
      </div>

      {callStatus === CallStatus.INACTIVE && (
        <div className="text-center text-gray-600 mt-4">
          <p className="text-sm">
            Click "Call" to begin your AI-powered interview session. Ensure your microphone is enabled.
          </p>
        </div>
      )}
    </>
  );
}

export default Agent;
