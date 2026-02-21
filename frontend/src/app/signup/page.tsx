"use client";

import Image from "next/image";
import { Facebook, Instagram, Linkedin} from "lucide-react" ;
import { Sora,Inter } from "next/font/google";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

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
        <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-r from-[#020617] via-[#0A0A3C] to-[#020024] bg-[length:300%_300%] animate-gradient">
 
            <div className="relative w-full max-w-4xl h-[520px] rounded-3xl bg-[#1E3C6D]/20 overflow-hidden shadow-2xl flex transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                
                {/* Left Side - Illustration and Text */}

                <div className="relative top-0 h-full w-[400px] bg-gradient-to-br from-blue-500/50 via-cyan-500/20 to-black-500/80 rounded-r-[100px]" />

                    <div className="absolute top-0 left-2 z-10">
                        <Image 
                        src = "/logo.png" alt="Illustration"
                        width={100} height={40}
                        className="object-contain"/>
                    </div>

                    <div className="absolute z-10 mt-[310px] px-8 bg-gradient-to-r from-[#355872] via-[#BDE8F5] to-[#355872] bg-clip-text text-transparent">
                     
                        <h1 className={`${sora.className} text-4xl leading-none mb-4  `}>
                            Welcome to <br /> <a href="name" className="text-[#EFECE3]/20">Orean360</a>
                        </h1>
                    </div>

                    <div className="absolute z-10 mt-[350px] px-8 text-[#BDE8F5]/50">
                        <p className={`${inter.className} text-sm font-light italic leading-tight mt-[46px] px-0`}>
                            Simplify your workflow, social media, <br />and trilingual AI engagement in one smart platform.
                        </p>
                    </div>     
             
                {/* Right Side - Signup Form */}
                <div className="absolute top-8 right-8  text-[#BDE8F5] ">
                    <h4 className={`${inter.className} text-xs font-light`}>
                        Already have an account?{" "} <a href="/login"
                        className="text-[#78B9B5] hover:underline">Sign in</a>
                    </h4>
                </div> 

                <div className="absolute top-20 right-32 text-[#F5EFE7]">
                    <h1 className={`${inter.className} text-3xl font-bold`}>Create an Account</h1>
                </div>

                <form className="space-y-4 absolute top-[140px] right-20 w-[350px]">
                    <input 
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-full px-5 py-3 bg-[#243F6B] text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <input 
                    type="Password"
                    placeholder="Password"
                    className="   w-full rounded-full px-5 py-3 bg-[#243F6B] text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400  "
                    />
                    <input 
                    type="workplace name"
                    placeholder="Workplace Name"
                    className="w-full rounded-full px-5 py-3 bg-[#243F6B] text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400  "
                    />
                    {/* divider */}
                    <div className="flex items-center gap-4 my-4 text-white/40">
                        <div className="flex-1 h-px bg-white/20" />
                        <span className="text-sm">or</span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>
                    
                    {/* Social Media Signup Options */}
                    <div className="absolute bottom-[-45px] right-[-70px] w-[350px]">

                        <div className="flex items-center gap-4">

                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/40 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <FaGoogle size={20} className="text-white" />
                            </div> 

                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/40 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <FaFacebook size={18} className="text-white" />
                            </div>

                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/40 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <FaGoogle size={20} className="text-white" />
                            </div>
                                             

                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500/40 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <FaInstagram size={18} className="text-white" />
                            </div>
                                             

                        </div>

                    </div>

                </form>
 
            </div>
                 
        </div>
         
    )

}