import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const { allCourses, calculateRating, calculateChapterTime, currency } = useContext(AppContext);

  console.log("Course ID from URL:", id);
  console.log("All courses from context:", allCourses);

  const fetchCourseData = async () => {
    if (!allCourses || allCourses.length === 0) return;

    const findCourse = allCourses.find(course => course._id.toString() === id.toString());
    console.log("Found Course:", findCourse);
    setCourseData(findCourse);
  };

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses, id]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const calculateCourseDuration = (courseData) => {
    // Assuming calculateCourseDuration is defined somewhere else in AppContext
    // Otherwise you can replace it with a simple function if needed
    return "5 hours"; // placeholder
  };

  return (
    <div className='flex md:flex-row flex-col-reverse gap-6 relative items-start justify-between md:px-25 px-8 md:pt-15 pt-20 text-left bg-gradient-to-b from-cyan-100/70 via-cyan-100/40 to-transparent'>
      
      {/* Left Column */}
      <div className='max-w-xl z-10'>
        {/* Heading */}
        <h1 className="text-black font-bold text-[38px] md:text-[30px] mb-2">
          {courseData.courseTitle}
        </h1>
        
        {/* Course Short Description */}
        <p className="pt-2 md:text-base text-sm text-[16px] md:text-[16px] text-gray-600" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

        {/* Rating Section */}
        <div className='flex items-center space-x-2 pt-3 pb-1 text-sm text-gray-600'>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star rating" className='w-3.5 h-3.5' />
            ))}
          </div>
          <p className='text-blue-600'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? ' ratings' : ' rating'})</p>
          <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? ' students' : ' student'}</p>
        </div>

        <p className='text-gray-600'>Course by <span className='text-blue-600 underline'>Jagan Kuna</span></p> 
        
        {/* Course Structure */}
        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between p-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="arrow icon"/>
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc md:pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img src={assets.play_icon} alt='play icon' className='w-4 h-4 mt-1'/>
                        <div className='flex items-center justify-between w-full'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.isPreviewFree && <p className='text-blue-500 cursor-pointer'>Preview</p>}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Course Description */}
        <div className='py-20 text-sm md:text-default'>
          <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
          <div className="pt-3 rich-text text-gray-700 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:ml-6 [&>li]:mb-2" dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></div>
        </div>
      </div>

      {/* Right Column */}
      <div className="max-w-[424px] z-10 shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
        <img src={courseData.courseThumbnail} alt='Course Thumbnail'/>
        <div className='p-5'>
          {/* Flash Sale Timer */}
          <div className='flex items-center gap-2'>
            <img className='w-3.5' src={assets.time_left_clock_icon} alt='time left'/>
            <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price!</p>
          </div>

          {/* Pricing Section */}
          <div className='flex gap-3 items-center pt-2'>
            <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
              {currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2)}
              <span className="text-gray-500 line-through text-base ml-2">
                {currency}{courseData.coursePrice}
              </span>
            </p>
            <p>{courseData.discount}% off</p>
          </div>

          {/* Info Section (Rating, Duration, etc) */}
          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt='star icon'/>
              <p>{calculateRating(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt='clock icon'/>
              <p>{calculateCourseDuration(courseData)}</p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
