"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, UserIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from '../interfaces/Product';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="font-bold text-2xl">E-commerce
            <div className="text-white text-sm "> de BLACKCAT</div>
        </div>



        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium items-center">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/about">Productos</Link>
          </li>
          <Link href="/login">
            <Button className="bg-gray-600 hover:bg-gray-900 text-white rounded-full">
              <UserIcon /> Iniciar sesión
            </Button>
          </Link>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-950 text-white space-y-4 py-4">
          <Link href="/" onClick={toggleMenu}>
            Inicio
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            Productos
          </Link>
          <Link
            href="/login"
            className="w-full flex items-center justify-center px-7"
          >
            <Button className="bg-gray-600 hover:bg-gray-900 text-white rounded-full w-full ">
              <UserIcon /> Iniciar sesión
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
