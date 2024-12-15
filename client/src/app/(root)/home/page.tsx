import Navbar from '@/components/navbar/navbar'
import Section1 from '@/components/homesection/section1'
import React from 'react'
import Section2 from '@/components/homesection/section2'
import Section3 from '@/components/homesection/section3'

export default function Page() {
    return (
        <div>
            <Navbar />
            <Section1 />
            <Section2 />
            <Section3 />
        </div>
    )
}
