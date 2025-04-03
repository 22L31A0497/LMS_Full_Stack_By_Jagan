import React, { useState, useEffect, createContext } from 'react';
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration'; 

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate =useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const[isEducator,setIsEducator] = useState(true);

  // Load courses when the component mounts
   const calculateRating =(course)=>{
    if(course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach(rating =>totalRating += rating.rating);

    return totalRating / course.courseRatings.length;
   }
  // function to calculate course chapter time
  const calculateChapterTime =(chapter)=>{
    let time=0;
    chapter.chapterContent.map((lecture)=>time += lecture.lectureDuration);
    return humanizeDuration(time*60*1000,{units:['h','m','s'],round:true,language:'en'});
  }
  //function to calculate course duration
   const calculateCourseDuration =(course)=>{
    let time=0;
    course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=>time += lecture.lectureDuration));
    return humanizeDuration(time*60*1000,{units:['h','m','s'],round:true,language:'en'});
  
   }

   //function to calculate number of lectures in a course
     const calculateNoOfLectures =(course)=>{
      let totalLectures = 0;
      course.courseContent.forEach(chapter=>{
        if(Array.isArray(chapter.chapterContent)){
          totalLectures += chapter.chapterContent.length;
        }
      });
      return totalLectures;
     }
   

  useEffect(() => {
    setAllCourses(dummyCourses);
  }, []); // ✅ Directly setting the courses

  return (
    <AppContext.Provider value={{ currency, allCourses,navigate,calculateRating,  isEducator,setIsEducator,calculateNoOfLectures,calculateCourseDuration,calculateChapterTime}}>
      {children}
    </AppContext.Provider>
  );
};
     