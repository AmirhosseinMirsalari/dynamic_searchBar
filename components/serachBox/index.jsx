

import { BsSearch } from "react-icons/bs";
import { useState,useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";


const SearchBox = () => {
   const ref = useRef()
   const [searched, setsearched] = useState([]);

   const serachHandler = (q) => {
      axios
         .get("https://mernfa-server-sj.iran.liara.run/api/posts-pointer")
         .then((data) => {
            const a = data.data
               .filter((po) => po.title.toLowerCase().includes(q.toLowerCase()))
               .slice(0, 5);
            setsearched(a);
         })
         .catch((err) => console.log(err));
   };

   const searchBtn=()=>{
      Router.push("/search");
   }

   return (
      <div className=" h-[40vh] bg-green-500 flex justify-center items-center w-full">
         <div
            className={
               ref.current.value == ""
                  ? " w-[40rem] bg-white  relative  rounded-lg"
                  : " w-[40rem] bg-white  relative  rounded-tr-lg rounded-tl-lg"
            }
         >
            <input
               onChange={(e) => {
                  serachHandler(e.target.value);
               }}
               placeholder="لطفا جستجو کنید..."
               ref={ref}
               type="text"
               className=" w-full pl-12 rounded-lg p-4 shadow-black transition-all duration-300 focus:shadow-2xl outline-none"
            />
            <div className=" shadow-lg shadow-zinc-300 bg-white rounded-br-lg rounded-bl-lg absolute top-12 right-0 left-0">
               <ul className=" flex flex-col gap-2">
                  {ref.current.value == "" ? (
                     <li></li>
                  ) :(searched.length==0)
                  ?<li className=" m-4">نتیجه‌ای یافت نشد.</li>
                  :(
                     searched.map((po, i) => (
                        <li
                           key={i}
                           className=" px-2 py-3 rounded-md duration-200 transition-all
                                 hover:bg-zinc-200 m-2 w-[95%] "
                        >
                           <Link
                              href={`https://mernfa.ir/blog/posts/${po.slug}`}
                           >
                              <a target={"_blank"} className=" w-full">
                                 {po.title}
                              </a>
                           </Link>
                        </li>
                     ))
                  )}
               </ul>
            </div>
            <div className=" text-2xl text-green-700 absolute left-2 top-4 cursor-pointer">
               <BsSearch onClick={()=>searchBtn()} />
            </div>
         </div>
      </div>
   );
};

export default SearchBox;
