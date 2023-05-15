"use client";

import {Fragment} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect} from 'react';
import logo from '../assets/images/logo.svg'
import { 
  signIn, 
  signOut, 
  useSession, 
  LiteralUnion, 
  ClientSafeProvider,
  getProviders
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers';
const Nav = () => {
  const { data: session } = useSession()
  const isUserLoggedIn:boolean = true;

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>| null>(null);
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(()=>{
    const callProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    callProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
        src={logo}
        alt="filler"
        width={30}
        height={30}
        className="object-contain"
        />
        <p className="logo_text"></p>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" 
            className="black_btn" >
              Create Post
            </Link>
            <button 
              type="button" 
              onClick={() => signOut()}
              className="outline_btn"
              >
                Sign Out
              </button>
              <Link href="/profile">
              <Image
              src={logo}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              />
            </Link>
          </div>
        ):
        <>
          {providers && 
            Object.values(providers).map((provider)=>(
              <button
              type="button"
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              className='black_btn'
              > 
                Sign In
              </button>
            ))
          }
        </>
        }
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
              <Image
              src={logo}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              // don't directly change state by inverting state inside setState function
              // use a callback function as shown below
              onClick={()=>{setToggleDropDown((prev)=>!prev)}}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={()=> setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={()=> setToggleDropDown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={()=>{
                      setToggleDropDown(false)
                      signOut()
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ):(
          <>
          {providers && 
            Object.values(providers).map((provider)=>(
              <button
              type="button"
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              className='black_btn'
              > 
                Sign In
              </button>
            ))
          }
        </>
        )
        }
      </div>
    </nav>
  )
}

export default Nav