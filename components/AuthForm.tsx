"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import FormField from "./FormField";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
}
const AuthForm = ({type} : {type: FormType}) => {
  const router = useRouter()
  const formSchema = authFormSchema(type) 
  
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: '',
      password: ''
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === 'sign-up') {
        const {name, email, password} = values;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password
        })

        if(result?.success === false) {

          toast.error(result.message)
          return
        }

        toast.success('Account created successfully. Please sign in')
        router.push('/sign-in')
      }else {
         const {email, password} = values;

         const userCredential = await signInWithEmailAndPassword(auth, email, password);

         const idToken = await userCredential.user.getIdToken();

         if(!idToken) {
          toast.error('Sign in failed')
          return
         }

         await signIn({email, idToken})

        toast.success('Sign in successfully')
        router.push('/')
        console.log('SIGN IN', values)
      }
    }
    catch(error){
      console.log(error)
      toast.error(`There was an error: ${error}`)
    }
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
        {!isSign && (<FormField control={form.control} name='name' label='Name' placeholder='Your Name' />)}
          <FormField control={form.control} name='email' label='email' placeholder='Your Email Address' type="email" />
          <FormField control={form.control} name='password' label='password' placeholder='Enter your password' type="password"/>
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