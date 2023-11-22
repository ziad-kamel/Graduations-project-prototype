import {auth} from "@clerk/nextjs";
import { NextResponse } from "next/server";


import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})



export async function POST(
    req: Request
) {
    try {
        const {userId} = auth();
        const body = await req.json();
        const {prompt} = body

        if (!userId){
            return new NextResponse("Unauthorrized", {status:401});
        }
        
        
        if (!prompt){
            return new NextResponse("Prompt is required", {status:400});
        }

        const response = await replicate.run(
            "stability-ai/stablelm-tuned-alpha-7b:c49dae362cbaecd2ceabb5bd34fdb68413c4ff775111fea065d259d577757beb",
            {
              input: {
                prompt: "What's your mood today?"
              }
            }
          );

        return NextResponse.json(response.data.choices[0].messages);
    } catch(error){
        console.log("[MUSIC_ERROR]",error)
        return new NextResponse("Internal error",{status: 500});
    }
}
