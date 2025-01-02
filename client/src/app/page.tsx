"use client"
import Section1 from '@/components/homesection/section1'
import React, { useEffect } from 'react'
import Section2 from '@/components/homesection/section2'
import Section3 from '@/components/homesection/section3'
import { useSession } from 'next-auth/react'
import { googleLogin } from '@/lib/store/thunks/user-thunks'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'

export default function Home() {
  const { data: session } = useSession()


  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (session?.user) {
      const { email } = session.user;
      if (email) {
        dispatch(googleLogin({ email })).unwrap().then((response) => {
          if (response.statusCode === 200) {
            setTimeout(() => (window.location.href = "/u/home"), 1500);
          }
          if (response.message) {
            toast(response.message);
          }
        })
          .catch((error) => {
            toast.error((error as { message: string }).message || "An unknown error occurred");
          });
      }
    }
  }, [session?.user, dispatch]);
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  )
}
