"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {email, z} from "zod"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
}
const AuthForm = ({type} : {type: FormType}) => {

  const formSchema = authFormSchema(type) 
  
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values)
  }

  const isSign = type === 'sign-in'
    return (
        <div className="card-border lg:min-w-[556px]"> 
            <div className="flex flex-col gap-6 card py-14 px-10">
              <Form {...form}>
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="./logo.svg" alt='logo' height={32} width={38}/>
                    <h2>MockMate</h2>
                </div>
                <h3>Practice jobs interview with AI</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form" >
        {!isSign && <p>Name</p>}
        <p>Email</p>
        <p>Password</p>
        <Button  className="btn"type="submit">{isSign ? 'Sign In' : 'Create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center">
      {isSign ? 'No account yet?' : "Have an account already?"}
    
      <Link href={!isSign ? "/sign-in": "/sign-up"} className="font-bold text-user-primary ml-1">
      {!isSign ? "Sign in" : "Sign up"}
      </Link>
    </p>
    </div>
    </div>
    )

}

export default AuthForm