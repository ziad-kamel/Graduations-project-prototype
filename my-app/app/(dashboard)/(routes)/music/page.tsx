"use client";

import axios from "axios";
import { Music } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useRouter } from "next/navigation";


import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Empty } from "@/components/ui/empty";


import Sidebar from "@/components/sidebar";
import { formSchema } from "./constants";

const MusicPage = () => {
  const router = useRouter();
  
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      
      const response = await axios.post('/api/music', values)
      setMusic(response.data.audio)
      
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
       
      } else {
       
      }
    } finally {
      router.refresh();
    }
  }

  return ( 
    <div className="flex justify-between pt-4" >
    <Sidebar/>
    <div className="flex justify-center w-10/12" >

    

    <div className = "w-9/12 ">
      <Heading
        title="Audio Generation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgcolor="text-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Enter your prompt" 
                        {...field}
                        style={{color:"black", padding:"1rem"}}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon" style={{backgroundColor:"gray"}}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <Empty label="No audio generated." />
          )}
          <div>
            {music && (
              <audio controls className="w-full mt-8">
                <source src={music} />
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>

    </div>

    </div>
   );
}
 
export default MusicPage;