import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { PiggyBank } from 'lucide-react'
import { redirect } from 'next/navigation';
import React from 'react'
import CreateTransactionDialog from './_components/CreateTransactionDialog';
import Overview from './_components/Overview';
async function page() {
  const user=await currentUser();

  if(!user){
    redirect("/sign-in")
  }

  const userSettings=await prisma.userSettings.findUnique({
    where:{
      userId: user.id,
    }
  })

  if(!userSettings){
    redirect("/wizard")
  }

  return (
    <div className='h-full bg-background'>
        <div className="border-b bg-card ">
          <div className="containeer flex flex-wrap justify-between items-center gap-6 py-8">
            <p className='text-3xl font-bold ml-4'>Hello,{user.firstName}! 👋</p>

            <div className='flex items-center gap-3 mr-2'>
              <CreateTransactionDialog trigger={
                <Button
                variant={"outline"}
                className='border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white'>
                  New income 🤑
                </Button>
              }
              type="income"/>
              <CreateTransactionDialog trigger={
              <Button
              variant={"outline"}
              className='border-emerald-500 bg-rose-950 text-white hover:bg-emerald-700 hover:text-white'>
                New expense 😤
              </Button>
              }
              type="expense"/>
            </div>
          </div>
        </div>
        <Overview userSettings={userSettings} />
    </div>
  )
}
 

export default page