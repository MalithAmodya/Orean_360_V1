import { Facebook, Instagram, Linkedin } from "lucide-react";

 

export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6"> 

            <div className="w-full max-w-6xl h-[520px] rounded-2xl flex border">

                {/* Left Side */}
                <div className="w-1/2 p-10 flex-col justify-center border-r">

                    <h1 className="text-3xl font-semibold">
                        Welcome to Orean360
                    </h1>

                    <p className="mt-4">
                        Simplify your workflow, social media, and trilingual AI engagement in one smart platform.
                    </p>

                </div>

                {/* Right Side */}

                <div className="w-1/2 p-10 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold mb-6">
                        Create an Account
                    </h2>

                    <form className="space-y-4">

                        <input 
                        type="text" 
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded"
                        />

                        <input 
                        type="text" 
                        placeholder="password"
                        className="w-full px-4 py-2 border rounded"
                        />

                        <input 
                        type="text" 
                        placeholder="Workplace Name"
                        className="w-full px-4 py-2 border rounded"
                        />

                        <div className="flex items-center gap-4 my-6 text-white/60">
                            <div className="flex-1 h-[1px] bg-white/30" />
                            <span className="text-sm">or</span>
                            <div className="flex-1 h-[1px] bg-white/30" />
                        </div>

                        <div className="flex justify-center gap-6 my-4">

                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
                                <Facebook size={20} />
                            </div>

                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
                                <span className="font-bold text-lg">G</span>
                            </div>

                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
                                <Instagram size={20} />
                            </div>

                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
                                <Linkedin size={20} />
                            </div>

                        </div>


                        <button
                        type="submit"
                        className="w-full py-2 border rounded">
                        Sign Up
                        </button>
                    </form>


                </div>
            </div>

        </div>

    );

}