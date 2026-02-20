"use client";

import Image from "next/image";
import { Facebook, Instagram, Linkedin} from "lucide-react" ;
import { Sora,Inter } from "next/font/google";

const sora = Sora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
});
 

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1a3a] via-[#0E1F4D] TO-[#020617] PX-6">


            {/* Left Side - Illustration and Text */}
            <div className="relative w-full max-w-4xl h-[520px] rounded-4xl overflow-hidden shadow-2xl flex">

                <div className="relative top-0 h-full w-[400px] bg-gradient-to-br from-blue-500/50 via-cyan-500/20 to-black-500/80 rounded-r-[100px]" />

                    <div className="absolute top-0 left-2 z-10">
                        <Image 
                        src = "/logo.png" alt="Illustration"
                        width={100} height={40}
                        className="object-contain"/>
                    </div>

                    <div className="absolute z-10 mt-[310px] px-8 bg-gradient-to-r from-[#355872] via-[#f5fee5] to-[#355872] 
                    bg-clip-text text-transparent"> 
                        <h1 className={`${sora.className} text-4xl leading-none mb-4  `}>
                            Welcome to <br /> Orean360
                        </h1>
                    </div>

                    <div className="absolute z-10 mt-[350px] px-10 bg-gradient-to-r from-[#9CD5FF] via-[#f5fee5] to-[#9CD5FF] 
                    bg-clip-text text-transparent ">
                        <p className={`${inter.className} text-sm font-light italic leading-tight mt-[46px] px-0`}>
                            Simplify your workflow, social media, <br />and trilingual AI engagement in one smart platform.
                        </p>
                    </div>



                 
                     

                         

                    
            </div>
        </div>
 

         
    )

}