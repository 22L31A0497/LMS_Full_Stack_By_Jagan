import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext'; // ✅ Correct path if needed
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'; // ✅ Correct path if needed

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration,navigate } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 5, totalLectures: 5 },
    { lectureCompleted: 1, totalLectures: 8 },
    { lectureCompleted: 0, totalLectures: 12 },
    { lectureCompleted: 6, totalLectures: 6 },
    { lectureCompleted: 5, totalLectures: 10 },
    { lectureCompleted: 2, totalLectures: 5 },
    { lectureCompleted: 1, totalLectures: 8 },
    { lectureCompleted: 12, totalLectures: 12 },
    { lectureCompleted: 3, totalLectures: 6 },
  ]);

  return (<>
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
          <tr>
            <th className="px-4 py-3 font-semibold truncate">Course</th>
            <th className="px-4 py-3 font-semibold truncate">Duration</th>
            <th className="px-4 py-3 font-semibold truncate">Progress</th>
            <th className="px-4 py-3 font-semibold truncate">Status</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course, index) => (
            <tr key={index} className="border-t">
              <td className="flex items-center space-x-4 p-4">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-14 sm:w-24 md:w-28"
                />
                <div>
                  <p className="font-semibold">{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index]?(progressArray[index].lectureCompleted *100)/progressArray[index].totalLectures:0} className='bg-gray-300 rounded-full'/>
                </div>
              </td>
              <td className="p-4">{calculateCourseDuration(course)}</td>
              <td className="p-4">
                {progressArray[index] ? (
                  <>
                    {progressArray[index].lectureCompleted} / {progressArray[index].totalLectures} <span>Lectures</span>
                  </>
                ) : (
                  "0 / 0 Lectures"
                )}
              </td>
              <td className="px-4 py-3 max-sm:text-right">
                <button
                  className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-all duration-300 "
                onClick={() => navigate('/player/' + course._id)}>
                  {progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures
                    ? "Completed"
                    : "On Going"}

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
    <Footer/>
    </>
   
  );
};

export default MyEnrollments;
