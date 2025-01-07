"use server"

import { generateOtp } from "../helpers/generateOtp"
import { supabase } from "../lib/initSupabase"
import { EmailTemplate } from '../components/EmailTemplate/EmailTemplate';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export const checkCurrentPass = async (currentPass: string) => {
    try {

        let { data: users, error } = await supabase
            .from('users')
            .select("*")
            .eq('id', 1)

            console.log(users)

        if (users && users[0].otp == null) {

            let { data: users, error } = await supabase
                .from('users')
                .select("*")
                .eq('password', currentPass)



            if (users && users.length > 0) {

                const generatedOtp = await generateOtp()
                const user = users[0]

                console.log(generatedOtp, user.id)

                const { data:sendMail, error:emailError } = await resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>',
                    to: ['geeproa@gmail.com'],
                    subject: 'Hello world',
                    react: EmailTemplate({ otp: generatedOtp }),
                  });
                
                  if (emailError) {
                    console.log(emailError)
                    return {success:false,message:"Sending email failed"};
                  }

                const { data, error } = await supabase
                    .from('users')
                    .update({ otp: generatedOtp.toString() })
                    .eq('id', user.id)
                    .select()

                console.log(data)

                if (data) return { success: true, message: "Enter the otp below" }
                else return { success: false, message: "Something went wrong" }

            } else {
                return { success: false, message: "Incorrect password, try again" }
            }
        }else{
            return { success: false, message: "A recent activity to change the password was performed, please try again later" }
        }



    } catch (error) {
        console.log("Failed in checkOtp", error)
        return { success: false, message: "Something went wrong" }
    }
}


export const checkOtp = async (enteredOtp: string) => {

    try {

        let { data: users, error } = await supabase
            .from('users')
            .select("*")
            .eq('otp', enteredOtp)

        if (users && users.length > 0) {
            return { success: true, message: "OTP was perfect, proceed to the next steps" }
        } else {
            return { success: false, message: "OTP was incorrect, Try again" }
        }

    } catch (error) {
        console.log("Failed in checkOtp", error)
        return { success: false, message: "Something went wrong" }
    }

}


export const changePass = async (newPass: string, id: number) => {

    try {

        const { data, error } = await supabase
            .from('users')
            .update({ password: newPass })
            .eq('id', id)
            .select()

        if (data) {
            return { success: true, message: "Password was reset, logging off" }
        } else {
            return { success: false, message: "Reseting password failed, try again" }
        }

    } catch (error) {
        console.log("Failed in changePass", error)
        return { success: false, message: "Something went wrong" }
    }

}