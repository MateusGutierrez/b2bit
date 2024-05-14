import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema, TLoginFormValue } from "@/schemas"

export function ProfileForm() {
  const form = useForm<TLoginFormValue> ({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: "",
        password: ""
    },
  })

  function onSubmit(values: TLoginFormValue) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[25.88px]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            
            <FormItem>
              <FormLabel className="text-[#262626] text-lg font-semibold leading-[22.5px] mb-[9px]">E-mail</FormLabel>
              <FormControl>
                <Input placeholder="@gmail.com" className="bg-[#F1F1F1] h-[54.25px] rounded-[9px] py-[18px] px-[20.25px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            
            <FormItem>
              <FormLabel className="text-[#262626] text-lg font-semibold leading-[22.5px] mb-[9px]">Password</FormLabel>
              <FormControl>
                <Input placeholder="****************" type="password" className="bg-[#F1F1F1] h-[54.25px] rounded-[9px] py-[18px] px-[20.25px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button type="submit" className="w-full h-[54px] text-[#FAFAFA] leading-[56.25px] text-[18px] font-bold rounded-[9px]" >Sign In</Button>
      </form>
    </Form>
  )
}
