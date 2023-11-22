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
        const {prompt,amount = 1, resolution = "512x512"} = body

        if (!userId){
            return new NextResponse("Unauthorrized", {status:401});
        }
        
        
        if (!prompt){
            return new NextResponse("Prompt is required", {status:400});
        }
        if (!amount){
          return new NextResponse("amount is required", {status:400});
      }
      if (!resolution){
        return new NextResponse("resolution is required", {status:400});
    }

    const response = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt
        }
      }
    );

        return NextResponse.json(response.data.data)
    } catch(error){
        console.log("[IMAGE_ERROR]",error)
        return new NextResponse("Internal error",{status: 500});
    }
}
