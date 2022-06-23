export interface SipFunction {
    () : string
 }

export interface SipVO extends SipFunction {
    method_t: string | undefined,
    method_s : string,
    via: string, 
    max_forwards: string,
    from: string,
    to: string,
    contact: string,
    call_id: string,
    cseq: string,
    user_agent: string,
    date: string,
    allow: string,
    supported: string,
    
    content_length: string,
    
    reason?: string,
    content_type?: string,
    k?: string,
    c?: string,
    [x: string] : string | undefined,
}

