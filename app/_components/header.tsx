"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import MenuSheet from "./menu";
import { Button } from "./ui/button";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-white px-5 py-6">
        <Image src="/logo.svg" alt="Aparatus" width={100} height={26.09} />

        <Button variant="outline" size="icon" onClick={() => setMenuOpen(true)}>
          <MenuIcon />
        </Button>
      </header>
      <MenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
};

export default Header;
