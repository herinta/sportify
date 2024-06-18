'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(1, { message: 'username is required' }),
  password: z.string().min(1, { message: 'password is required' }),
});

type Inputs = z.infer<typeof formSchema>;

const FormLogin = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [pending, startTransition] = useTransition();
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { handleSubmit, control } = form;

  function onSubmit(data: Inputs) {
    // console.log(data);

    startTransition(async () => {
      const res = await signIn('credentials', {
        username: data?.username,
        password: data?.password,
        redirect: false,
      });

      // console.log(res, 'RESSSSPONSEEEEE');

      if (res?.ok) {
        toast.success('Login Successful');
        router.push('/dashboard');
      } else if (!res?.ok) {
        toast.error('Login Vailed');
      }
    });
  }

  function tooglePassword() {
    setShow((next) => !next);
  }

  return (
    <Form {...form}>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="2x:mt-7 mt-5 space-y-6"
      >
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username" className="mb-2 font-medium">
                Username
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center font-sans">
                  <Input type="text" placeholder="enter username" {...field} />
                  <AvatarIcon className="absolute right-4 h-5 w-5 text-azure-600" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="mb-2 font-medium">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center font-sans">
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder="enter password"
                    {...field}
                  />
                  {show ? (
                    <EyeClosedIcon
                      className="absolute right-4 h-5 w-5 cursor-pointer text-azure-600"
                      onClick={tooglePassword}
                    />
                  ) : (
                    <EyeOpenIcon
                      className="absolute right-4 h-5 w-5 cursor-pointer text-azure-600"
                      onClick={tooglePassword}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={'ringHover'} disabled={pending} type="submit">
          {pending && <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
};

export default FormLogin;
