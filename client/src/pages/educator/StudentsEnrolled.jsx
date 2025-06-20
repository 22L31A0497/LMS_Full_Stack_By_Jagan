import React from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react' // import { useContext } from 'react'
import Loading from '../../components/student/Loading'

const StudentsEnrolled = () => {
 const[enrolledStudents, setEnrolledStudents] = useState(null)
 const fetchEnrolledStudents = async () => {
   // Simulating an API call to fetch enrolled students
   setEnrolledStudents(dummyStudentEnrolled);
 }
 useEffect(() => {
   fetchEnrolledStudents(); }
  , [])
  return enrolledStudents? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden pb-4 '>
        <table className='table-fixed md:table-auto w-full overflow-hidden pb-4'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
              <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
              <th className='px-4 py-3 font-semibold'>Student Name</th>
              <th className='px-4 py-3 font-semibold'>Course Title</th>
              <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
            </tr>

          </thead>
          <tbody className='text-sm text-gray-500'>
            {enrolledStudents.map((item, index) => (
              <tr key={index} className='border-b border-gray-500/20 hover:bg-gray-100'>
                <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                <td className='md:px-4 py-3 px-2 flex items-center space-x-3'>
                  <img src={item.student.imageUrl} alt='Student Image' className='w-10 h-10 rounded-full'/>
                  <span className='truncate'>{item.student.name}</span>
                </td>
                <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                <td className='px-4 py-3 hidden sm:table-cell'>{new Date(item.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}</tbody>
         
        </table>
      </div>
    </div>
  ):<Loading/>
}

export default StudentsEnrolled
