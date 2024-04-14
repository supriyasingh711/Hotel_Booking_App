import { useForm } from "react-hook-form"
import {  useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";



export type SignInFormData={
    email:string;
    password:string;
}
const SignIn=()=>{
    const {showToast}=useAppContext();
    const queryClient=useQueryClient();
    const navigate=useNavigate()
    const {register,
        formState:{errors},
        handleSubmit
    }=useForm<SignInFormData>()

    const mutation=useMutation(apiClient.signIn,{
        onSuccess:async ()=>{
            console.log("user signed in")
            //1.show the toast message  
            showToast({message:"Signed in successfully",type:"SUCCESS"})
            await queryClient.invalidateQueries("validateToken"); 

            navigate("/");

                
            //2.navigate to the home page

        },onError:(error:Error)=>{
                //show the toast
                showToast({message:"unsuccessful log in",type:"ERROR"})

        }
            })

            const onSubmit=handleSubmit((data)=>{
                    mutation.mutate(data)
            })

    return (
        <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold ">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Email<input 
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email",{required:"This field is required"})}
                    />
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Password<input 
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password",{
                        required:"This field is required",
                        minLength:{
                            value:6,
                            message:"Password must be 6 characters"
                        }
                    })}
                    />
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>
                <span className="flex items-center justify-between">
                    <span className="text-sm ">Not Registered? <Link className="underline" to="/register">Create an Account</Link></span>
                    <button 
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500">Log In</button>
                    </span>
        </form>
    )
}
export default SignIn;