import { PiggyBank } from 'lucide-react'
import React from 'react'

function Logo() {
  return (
    
      <div className='flex justify-center items-center gap-2 m-5'>

          <PiggyBank/>
          <span className='font-bold text-2xl  '>
              Expense Tracker
          </span>
      </div>
    
  )
}

export default Logo