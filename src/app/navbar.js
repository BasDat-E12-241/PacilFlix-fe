"use client";

import { useRouter } from "next/navigation";

function NavLink({ href, isActive, children }) {
  return (
    <li className={`nav-item ${isActive ? "active" : "" }`}>
      <a className={`nav-link ${isActive ? "active" : ""} `} href={href}>
        {children}
      </a>
    </li>
  );
}

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="#">PacilFlix</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse flex" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <NavLink href="/pengguna" isActive={router.pathname === "/pengguna"}>
            Pengguna
          </NavLink>
          <NavLink href="/trailer" isActive={router.pathname === "/trailer"}>
            Trailer
          </NavLink>
          <NavLink href="/tayangan" isActive={router.pathname === "/tayangan"}>
            Tayangan
          </NavLink>
          <NavLink href="/ulasan" isActive={router.pathname === "/ulasan"}>
            Ulasan
          </NavLink>
          <NavLink href="/daftar-unduhan" isActive={router.pathname === "/daftar-unduhan"}>
            Daftar Unduhan
          </NavLink>
          <NavLink href="/daftar-favorit" isActive={router.pathname === "/daftar-favorit"}>
            Daftar Favorit
          </NavLink>
          <NavLink href="/daftar-kontributor" isActive={router.pathname === "/daftar-kontributor"}>
            Daftar Kontributor
          </NavLink>
          <NavLink href="/langganan" isActive={router.pathname === "/langganan"}>
            Langganan
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}