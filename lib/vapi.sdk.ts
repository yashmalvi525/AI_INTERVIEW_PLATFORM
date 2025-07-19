// lib/vapi.sdk.ts
import Vapi from "@vapi-ai/web";

// Initialize VAPI with your public key
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

export default vapi;