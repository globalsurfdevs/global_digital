"use client"

import { changePass, checkCurrentPass, checkOtp } from '@/app/actions/otpActions';
import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
import { signOutAdmin } from '@/app/actions/authActions';

const items = ["Change password", "Trash", "Settings"]
type OtpState = { [key: number]: string };

const AdminSettings = () => {

    const [button, setButton] = useState("")
    const [otpSection,setOtpSection] = useState(false)
    const [newPassSection,setNewPassSection] = useState(false)
    const [otp,setOtp] = useState<OtpState>({
        0:"",
        1:"",
        2:"",
        3:"",
        4:""
    })
    const [otpError,setOtpError] = useState("")
    const [currentPassError,setCurrentPassError] = useState("")
    const [oldPass,setOldPass] = useState("")
    const [newPass,setNewPass] = useState("")
    const [cPass,setCPass] = useState("")
    const [error,setError] = useState("")

    const { data: session, status } = useSession();

    const handleChange = (index:number, value:string) => {
        // Update the state for the specific input field
        if (/^\d*$/.test(value)) { // Ensure only numeric input
          setOtp((prev) => ({
            ...prev,
            [index]: value
          }));
        }
      };

      const handleCurrentPassCheck = async() =>{
        const result = await checkCurrentPass(oldPass)
        console.log(result)
        console.log(oldPass)
        if(result?.success){
            setCurrentPassError("")
            setOtpSection(true)
        }else{
            if(result){
                setCurrentPassError(result?.message)
            }
        }
      }

      const handleOptCheckAndPass = async() =>{
        const enteredOtp = Object.values(otp).join("")
        const result = await checkOtp(enteredOtp)
        if(result?.success){
            setOtpError(result.message)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setOldPass("")
            setNewPassSection(true)
        }else{
            if(result){
                setOtpError(result?.message)
            }
        }
      }

      const handlePasswordChange = async() =>{
        if(newPass!==cPass){
            setError("Passwords does not match, try again")
            return;
        }

        if(newPass=="" || cPass==""){
            return;
        }

        const result = await changePass(newPass,session?.user.id)
        if(result.success){
            toast.success(result.message)
            await signOutAdmin()
        }else{
            toast.error(result.message)
        }

        // setNewPassSection(false)
      }


    return (
        <div>
            <h1 className='text-2xl'>Admin Settings</h1>
            <div className='grid grid-cols-2 mt-10 gap-5'>
                {/* <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
                    <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                        {items.map((item) => (
                            <div
                                role="button"
                                className={`text-slate-800 flex w-full items-center rounded-md p-3 transition-all ${button == item ? "bg-slate-100" : ""}  hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100`}
                                onClick={() => setButton(item)}
                            >
                                {item}

                            </div>
                        ))}
                    </nav>
                </div> */}

                <div className=''>
                    

                        <div className="relative flex flex-col rounded-xl bg-transparent">
                            <h4 className="block text-xl font-medium text-slate-800">
                                Change Password
                            </h4>
                            <p className="text-slate-500 font-light">
                                Change your password here. After saving, you'll be logged out.
                            </p>
                            <p className='text-red-600'>{error}</p>
                            {!newPassSection ? (<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-1 flex flex-col gap-6">
                                    <div className="w-full max-w-sm min-w-[200px]">
                                        <label className="block mb-2 text-sm text-slate-600">
                                            Type in the current password
                                        </label>
                                        <input type="text" value={oldPass} onChange={(e)=>setOldPass(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
                                        <p className='text-red-600'>{currentPassError}</p>
                                    </div>
                                    {otpSection && <div className="w-full max-w-sm min-w-[200px]">
                                        <label className="block mb-2 text-sm text-slate-600">
                                            Enter the OTP send to the mail address
                                        </label>
                                        <div className="flex items-center justify-between gap-3 bg-slate-200 p-2 px-8">
                                            {Array.from({length:5}).map((item,index)=>(
                                                <input
                                                type="text"
                                                value={otp[index]}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                className="w-full h-10 text-center text-sm font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                                pattern="\d*" maxLength={1} />
                                            ))}
                                            
                                    
                                        </div>
                                        <p>{otpError}</p>
                                    </div>}
                                    
                                </div>
                                <div className="inline-flex items-center mt-2">
                                    
                                </div>
                                <button className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                                type="button" onClick={otpSection ? handleOptCheckAndPass :  handleCurrentPassCheck}>
                                    Enter new password -&gt;
                                </button>
                                
                            </form>)

                            :


                            (<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-1 flex flex-col gap-6">
                                    <div className="w-full max-w-sm min-w-[200px]">
                                        <label className="block mb-2 text-sm text-slate-600">
                                            Type in the new password
                                        </label>
                                        <input type="text" value={newPass} onChange={(e)=>setNewPass(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
                                    </div>

                                    <div className="w-full max-w-sm min-w-[200px]">
                                        <label className="block mb-2 text-sm text-slate-600">
                                            Retype the password again
                                        </label>
                                        <input type="text" value={cPass} onChange={(e)=>setCPass(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
                                    </div>
                                    
                                </div>
                                <div className="inline-flex items-center mt-2">
                                </div>
                                <button className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                                type="button" onClick={handlePasswordChange}>
                                    Save
                                </button>
                                
                            </form>)
                                }
                        </div>
                    

                </div>
            </div>
        </div>
    )
}

export default AdminSettings