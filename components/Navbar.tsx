"use client" 
import React, { useState } from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn'
import { UserButton } from '@clerk/nextjs'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'

function Navbar() {
  return (
    <>
        <DesktopNavbar/>
        <MobileNavbar/>
    </>
  )
}

export default Navbar


const items=[
    {
        link:"/",
        label:"Dashboard"
    },
    {
        link:"/transactions",
        label:"Transaction"
    },
    {
        link:"/manage",
        label:"Manage"
    }
];
export function MobileNavbar() {
  const [isOpen,setIsOpen] =useState(false);

  return(
    <div className='bg-background block border-separate md:hidden'>
      <nav className='flex justify-between items-center container px-8'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu/>
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[400px] sn:w-[540px]' side="left">
            <Logo />
            <div className='flex flex-col pt-4 gap-1'>
              {items.map((item)=>(
                <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
                clickCallback={()=>setIsOpen((prev)=>!prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className='flex justify  items-center h-[80px] min-h-[60px] gap-x-4'>
          <Logo />
          <ThemeSwitcherBtn/>
          {/* <UserButton afterSwitchSessionUrl='/sign-in' /> */}
        </div>
      </nav>
    </div>
  )
}


function DesktopNavbar() {
  return (
    <div className='hidden border-seperate border-b bg-background md:block'>
      <nav className='flex justify-between items-center container px-8'>
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
            <Logo/>
            <div className='flex h-full'>
            {items.map(item=>(
                <NavbarItem key={item.label} 
                            link={item.link} 
                            label={item.label}/>
            ))}
        </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn/>
          {/* <UserButton showName/> */}
        </div>
        </nav>
    </div>
  )
}

function NavbarItem({link,label,clickCallback}:{link:string,label:string;clickCallback?:() => void;}) {
    const pathname=usePathname();
    const isActive= pathname === link
  return (
    <div className='relative flex  items-center '>
        <Link href={link} 
            className={cn(
            buttonVariants({variant:"ghost" }),
            "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
            isActive && "text-foreground"
            )}
            onClick={()=>{
              if (clickCallback) clickCallback();
            }
            }
            >
            {label}
        </Link>
        {
          isActive && (
            <div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block'></div>
          )
        }
    </div>
  )
}
