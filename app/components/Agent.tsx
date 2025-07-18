import React from 'react';
import Image from 'next/image';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface AgentProps {
  userName: string;
}

function Agent({ userName }: AgentProps) {
  const isSpeaking = true;
  const callStatus = CallStatus.ACTIVE; // ✅ Changed to show the green "Call" button
  const messages = [
    'what is your name?',
    'my name is yash malvi, nice to meet you',
  ];
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="vapi" height={54} width={65} />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user-avatar"
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
            <p className="transition-opacity duration-500 opacity-100">
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus === CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            {/* Optional ping animation if connecting */}
            {callStatus === CallStatus.CONNECTING && (
              <span className="absolute animate-ping rounded-full opacity-75" />
            )}
            <span>Call</span> {/* ✅ Force label to 'Call' */}
          </button>
        ) : (
          <button className="btn-diconnected">End</button>
        )}
      </div>
    </>
  );
}

export default Agent;
