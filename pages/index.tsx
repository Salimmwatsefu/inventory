import React from 'react'
import TremChart1 from '@/components/charts/TremChart1'
import EmployeesCard from '@/components/charts/EmployeesCard'
import SalesCard from '@/components/charts/SalesCard'
import SalesAreaChart from '@/components/charts/SalesArea'
import BarGraph from '@/components/charts/SalesItem'

function Home() {
  return (
    <div className='sm:mx-10'>
      <div className='my-10 sm:flex lg:gap-24 gap-3'>
        
        <SalesCard/>
        

        
        <EmployeesCard/>


        

      </div>
      <SalesAreaChart />

      <div className='sm:flex gap-5 mt-10'>
      <TremChart1 />
      <BarGraph/>
      </div>

    </div>
  )
}

export default Home