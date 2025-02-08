"use client";

import { useState } from "react";
import HomePage from "../homepage/HomePage"; 

export default function Sidebar() {
  const [isHomePageVisible, setIsHomePageVisible] = useState(false);
  const [isAccountVisible, setIsAccountVisible] = useState(false);

  const handleHomeButtonClick = () => {
    setIsHomePageVisible(!isHomePageVisible);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-[8px] mt-10">
        
        <div className="flex gap-[100px]">
          <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded-md hover:bg-[#F4F4F5]">
            <button onClick={handleHomeButtonClick}>Home</button>
          </div>
          {isHomePageVisible && <HomePage />}
        </div>

        <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded-md hover:bg-[#F4F4F5]">
          <button>Explore</button>
          
        </div>

        <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded-md hover:bg-[#F4F4F5]">
          <button>View page</button>
        </div>

        <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded-md hover:bg-[#F4F4F5]">
          <button>Account settings</button>
        </div>

      </div>
    </div>
  );
};






// "use client";

// import HomePage from "../homepage/HomePage";

// export default function Sidebar() {
//   return (
//     <div>
//       <div className="flex flex-col gap-[8px] mt-10">
//         <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">
//           <button>Home</button>
//         {/* <HomePage /> */}
//         </div>
//         <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">Explore</div>
//         <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">View page</div>
//         <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">Account settings</div>
//       </div>
//     </div>
//   )
// };
