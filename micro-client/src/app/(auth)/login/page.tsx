'use client'
// import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Login() {
  const router = useRouter();
  const [isError, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data) {
      return router.replace('/');
    }
  }, [])

  const onChangeForm = () => {
    setError('')

  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await signIn("Credentials", { ...data, redirect: false });

    if (res?.status === 200) {
      router.push("/");
      router.refresh();

    } else if (res?.error) {
      setError(res?.error);
      setIsLoading(false);
    }
  };
  // session.data ?  router.replace('/') 
  return status === 'unauthenticated' &&
    <>
      <Head>
        <title>Training</title>
        <meta name='title' content='Training | Login' />
        <meta
          name='description'
          content='This is NOT REAL Training! This site created for educational purposes only.'
        />

        <meta property='og:type' content='website' />
        <meta property='og:title' content='Training | Login' />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='robots' content='index, follow' />
      </Head>
      <div className='bg-[#fafafa] h-screen'>
        <main className='flex flex-row items-center justify-center w-full flex-shrink-0 flex-grow pb-8 h-[90%]'>
          <div className='flex flex-col flex-grow justify-center max-w-[350px]'>

            <div className=' rounded-[12x] border border-[#dbdbdb]'>
              <form className=' items-center bg-white box-border flex flex-col flex-shrink-0 py-[10px] px-9 relative align-baseline'>
                <p className='font-grandista text-4xl opacity-90 my-10'>Training</p>
                <Input
                  id="email"
                  label="Email"
                  disabled={isLoading}
                  register={register("email", {
                    required: {
                      value: true,
                      message: "Email không được để trống.",
                    },
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email không phù hợp.",
                    },
                    onChange: (e) => setError('')
                  })}
                  errors={errors}
                />
                <Input
                  // className='text-xs w-full mb-4 rounded-[3px] border bg-[#fafafa] border-gray-300 p-2 focus:outline-none focus:border-gray-400 active:outline-none'
                  id='password'
                  label='Password'
                  disabled={isLoading}
                  register={register("password", {
                    required: {
                      value: true,
                      message: "Mật khẩu không được để trống.",
                    },
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có tối thiểu 6 kí tự.",
                    },
                    onChange: (e) => setError('')
                  })}
                  errors={errors}
                  type='password'
                />
                {isError !== '' && <p className="text-[13px] text-red-400">{'email or password  is incorrect.'}</p>}
                <Button
                  type="submit"
                  disabled={isLoading}
                  label={
                    isLoading ? (
                      // <BeatLoader color="#121212" />
                      'isLoading'
                    ) : (
                      "Đăng nhập"
                    )
                  }
                  onClick={handleSubmit(onSubmit)}
                />
                <div className='flex justify-center mt-5 items-center w-full'>
                  <a
                    className='text-xs text-blue-900 cursor-pointer mb-2'
                    aria-disabled
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
    ;
}