"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavLink({ href, isActive, children }) {
  return (
    <li className={`${isActive ? "active" : "" }`}>
      <a className={`transition-all px-3 py-1 rounded-full ${isActive ? "active font-bold bg-red-primary hover:opacity-70" : "hover:text-red-primary"} `} href={href}>
        {children}
      </a>
    </li>
  );
}


// function NavLink({ href, isActive, children }) {
//   return (
//     <li>
//       <Link href={href} legacyBehavior={false}>
//         <a className={`transition-all px-3 py-1 rounded-full ${isActive ? "active font-bold bg-red-primary hover:opacity-70" : "hover:text-red-primary"}`}>
//           {children}
//         </a>
//       </Link>
//     </li>
//   );
// }


export default function Navbar() {
  const pathname = usePathname();

  // Change this to get different navbar
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <nav className="flex gap-16 px-8 py-4 items-center bg-primary fixed w-full left-0">
      <a className="font-semibold text-2xl text-red-primary" href="/">PacilFlix</a>
      {!isLoggedIn ? 
        <div className="justify-between flex w-full">
          <div>
            <ul className="flex gap-4">
              <NavLink href="/trailer" isActive={pathname === "/trailer"}>
                Trailer
              </NavLink>
              
            </ul>
          </div>
        </div>
      :
        <div className="justify-between flex w-full">
          <div>
            <ul className="flex gap-4">
              <NavLink href="/daftar-tayangan" isActive={pathname === "/daftar-tayangan"}>
                Daftar Tayangan
              </NavLink>
              <NavLink href="/daftar-kontributor" isActive={pathname === "/daftar-kontributor"}>
                Daftar Kontributor
              </NavLink>
              <NavLink href="/daftar-favorit" isActive={pathname === "/daftar-favorit"}>
                Daftar Favorit
              </NavLink>
              <NavLink href="/daftar-unduhan" isActive={pathname === "/daftar-unduhan"}>
                Daftar Unduhan
              </NavLink>
              <NavLink href="/langganan" isActive={pathname === "/langganan"}>
                Langganan
              </NavLink>
            </ul>
          </div>
          <div className="border-2 border-red-primary px-4 rounded-full">
            Logout
          </div>
        </div>
      }
      </nav>
  );
}