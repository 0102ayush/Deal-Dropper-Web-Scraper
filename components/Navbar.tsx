import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const navIcons = [
  {
    src : 'assets/icons/search.svg', alt : 'search'
  },
  {
    src : 'assets/icons/black-heart.svg', alt : 'heart'
  },
  {
    src : 'assets/icons/user.svg', alt : 'user'
  }
]

const Navbar = () => {
  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link href="/" className='flex items-center gap-1'>
        <Image src='/assets/icons/logo.svg' alt='image' width={27} height={27} />
        <p className='nav-logo'>
          Deal <span className='text-primary'>Dropper</span>
        </p>
        </Link>

        <div className='flex items-center gap-5'>
          {
            navIcons.map((icon)=>(
              <Image className='object-contain' src={icon.src} alt={icon.alt} width={28} height={28} key={icon.alt} />

            ))
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar