"use client"
import Image from "next/image";
import povar from "../../../public/povar.png"
import mailIcon from "../../../public/mailIcon.svg"
import phone from "../../../public/smartPhoneIcon.svg"
import passwordLock from "../../../public/lockPasswordIcon.svg"
import viewOff from "../../../public/viewOffSlash.svg"
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";


type SignUpProps = {
    username: string;
    email: string;
    password: string
}

export default function SingUp() {
    const { signUp } = useAuthStore();
    const { register, handleSubmit } = useForm<SignUpProps>();
    const router = useRouter();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            alert(`Sign Up  successfully`);
            router.push("/signIn")
            
            queryClient.invalidateQueries({ queryKey: ['signup'] });
        },
        onError: (error: Error) => {
            alert(error.message);
            // Handle error (show error message to the user)
        },
    })

    const SignUp = (data: { username: string; email: string; password: string }) => {
        mutation.mutate(data)
    }

    return (
        <section className="flex items-center justify-between  container">
            <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                <Image src={povar} alt="" height={800} width={519} />
            </div>

            <form className="w-[540px]" onSubmit={handleSubmit(SignUp)}>
                <h1 className="text-[#424242] mb-16 text-center">Create Account</h1>
                <div className="flex flex-col gap-12">

                    <div className="relative">
                        <label htmlFor="username" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[58px] px-4">Username</label>
                        <Image src={phone} alt="" className="absolute block top-5 left-[30px]" />
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                            {...register("username", { required: true })}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="email" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[58px] px-4">Email</label>
                        <Image src={mailIcon} alt="" className="absolute block top-5 left-[30px]" />
                        <input
                            type="email"
                            placeholder="email@gmail.com"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                            {...register("email", { required: true })}
                        />
                    </div>



                    <div className="relative">
                        <label htmlFor="password" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[85px] px-4">Password</label>
                        <Image src={passwordLock} alt="" className="absolute block top-5 left-[30px]" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                            {...register("password", { required: true })}
                        />
                        <button>
                            <Image src={viewOff} alt="" className="absolute block top-6 right-[30px]" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col  items-center">
                    <button type="submit" className="form-button w-full">Create Account</button>
                    <span className="text-black/50 mb-8">- or -</span>
                    <div className="flex items-center text-[18px] text-black/50">
                        Already have an account?
                        <a href="#" className="font-semibold text-[#C3824E] block ml-1">Sign in</a>
                    </div>
                </div>
            </form>
        </section>
    )
}