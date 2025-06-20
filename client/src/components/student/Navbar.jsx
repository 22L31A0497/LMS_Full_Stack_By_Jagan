import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { UserButton,useUser } from '@clerk/clerk-react';  
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const{navigate,isEducator} =useContext(AppContext) // ✅ Fix: Use useNavigate hook
  const location = useLocation(); // ✅ Fix: Use useLocation hook
  const isCourseListPage = location.pathname.includes('/course-list');
  const { user } = useUser(); // ✅ Fix: Use useUser hook
  const{openSignIn} = useClerk(); // ✅ Fix: Use useClerk hook

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          { user &&
            <>
                <button onClick={()=>{navigate('/educator')}} className="cursor-pointer md:cursor-pointer sm:cursor-pointer">{isEducator?'Educator Dashboar':'Become Educator'}</button>

          |      <Link to='/my-enrollments'>My Enrollments</Link>  
            </>
           }

          </div>{ user ? <UserButton /> :
           <button 
           onClick={() => openSignIn()} 
            className="bg-blue-600 text-white px-5 py-2 rounded-full transition duration-300 hover:bg-blue-700 cursor-pointer">Create Account</button>
           }
          </div>
       {/* For Phone Screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:txt-xs'>
        { user &&
            <>
               <button onClick={()=>{navigate('/educator')}} className="cursor-pointer md:cursor-pointer sm:cursor-pointer">{isEducator?'Educator Dashboar':'Become Educator'}</button>

          |      <Link to='/my-enrollments'>My Enrollments</Link>  
            </>
           }
            </div> 
            {
              user ? <UserButton /> :
    
             <button onClick={()=> openSignIn()}><img src={assets.user_icon} alt=""/></button>
            }</div>
    </div>
  );
};

export default Navbar;
