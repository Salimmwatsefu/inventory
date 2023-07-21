import React from 'react'
import Employees from '@/components/Employees'
import { AuthProvider } from '@/components/AuthContext'

export default function employees() {
  return (
    <AuthProvider>
    <div>
        <Employees/>
    </div>
    </AuthProvider>
  )
}
