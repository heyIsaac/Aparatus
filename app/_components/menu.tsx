"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Sheet, SheetContent, SheetClose } from "./ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { House, CalendarDays, LogOut, ArrowRight, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Menu = ({ open, onOpenChange }: MenuProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut();
    onOpenChange(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    onOpenChange(false);
  };

  const categories = [
    "Cabelo",
    "Barba",
    "Acabamento",
    "Sombrancelha",
    "Massagem",
    "Hidratação",
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[370px] p-0 [&>button]:hidden">
        <div className="bg-background flex flex-col gap-6 px-0 py-6">
          {/* Header */}
          <div className="flex items-center justify-between px-5">
            <DialogTitle className="text-foreground text-lg font-bold">
              Menu
            </DialogTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>

          {/* Divider */}
          <div className="bg-border h-px w-full" />

          {/* User Section */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 px-5">
              <Avatar className="h-12 w-12">
                <AvatarImage src={session?.user?.image || undefined} />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <p className="text-foreground text-base leading-[1.4] font-semibold">
                  {session?.user?.name || "Usuário"}
                </p>
                <p className="text-muted-foreground text-xs leading-[1.4]">
                  {session?.user?.email || ""}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-5">
              <div className="flex flex-col justify-center">
                <p className="text-foreground text-base leading-[1.4] font-semibold">
                  Olá. Faça seu login!
                </p>
              </div>
              <Button
                onClick={handleLogin}
                className="bg-primary text-primary-foreground rounded-[999px] px-6 py-3 text-sm font-semibold"
              >
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col">
            <button
              onClick={() => handleNavigation("/")}
              className="hover:bg-accent flex items-center gap-3 rounded-[82px] px-5 py-3 text-left transition-colors"
            >
              <House className="text-foreground h-4 w-4 shrink-0" />
              <p className="text-foreground text-sm font-medium">Início</p>
            </button>
            <button
              onClick={() => handleNavigation("/bookings")}
              className="hover:bg-accent flex items-center gap-3 rounded-[82px] px-5 py-3 text-left transition-colors"
            >
              <CalendarDays className="text-foreground h-4 w-4 shrink-0" />
              <p className="text-foreground text-sm font-medium">
                Agendamentos
              </p>
            </button>
          </div>

          {/* Divider */}
          <div className="bg-border h-px w-full" />

          {/* Category Buttons */}
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <button
                key={category}
                className="hover:bg-accent flex h-10 items-center rounded-[82px] px-5 py-3 text-left transition-colors"
              >
                <p className="text-foreground text-sm font-medium">
                  {category}
                </p>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="bg-border h-px w-full" />

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hover:bg-accent flex items-center gap-3 rounded-[82px] px-5 py-3 text-left transition-colors"
            >
              <LogOut className="text-muted-foreground h-4 w-4 shrink-0" />
              <p className="text-muted-foreground text-sm font-medium">
                Sair da conta
              </p>
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
