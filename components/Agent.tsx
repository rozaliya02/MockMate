import { cn } from "@/lib/utils";
import Image from "next/image"

enum CallStatus {
    INACTIVE = 'inactive',
    CONNECTING = 'connecting',
    ACTIVE= 'active',
    FINISHED = 'finished',
}

const Agent = ({userName} : AgentProps) => {
    const callStatus = CallStatus.ACTIVE;
    const isSpeaking = true;
    const messages = [
        'Whats your name?',
        'My name is Joe Doe',
    ];

    const lastMwssage = messages[messages.length -1];
    return(
        <>
        <div className="call-view">
            <div className="card-interviewer">
                <div className="avatar">
                    <Image src="/ai-avatar.png" alt='vapi' width={65} height={54} className="obejct-cover"/>
                    {isSpeaking && <span className="animate-speak"></span>}
                </div>
                <h3>AI Interviewer</h3>
            </div>
            <div className="card-border">
                <div className="card-content">
                    <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className="rounded-full object-cover size-[120px]"/>
                    <h3>{userName}</h3>
                </div>
            </div>
        </div>
        {messages.length > 0 && (
            <div className="transcript-border">
                <div className="transcript">
                    <p key={lastMwssage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                        {lastMwssage}
                    </p>
                </div>
            </div>
        )}
        <div className="w-full flex justify-center">
            {callStatus !== 'active' ? (
                <button className="relative btn-call">
                    <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'connecting' & 'hidden')}/>
                         
                    <span>
                        {callStatus === 'inactive' || callStatus === 'finished' ? 'Call' : '...'}
                    </span>
                </button>
            ) :  (<button className="btn-disconnect">
                    <span>End Call</span>
                </button>)}

        </div>
        </>
        
    )
}

export default Agent