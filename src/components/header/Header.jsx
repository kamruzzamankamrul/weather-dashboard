import React, { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import Favourite from "./Favourite";
import FavouriteModal from "./FavouriteModal";

export default function Header() {
  const [showFavouriteModal, setShowFavouriteModal] = useState(false)


  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/60 to-black/0 pb-10">
        <nav className="container flex items-center justify-between py-6">
          <Logo />

          <div className="flex items-center gap-4 relative">
            <Search />
            <Favourite onshow={()=> setShowFavouriteModal(!showFavouriteModal)} />

            {showFavouriteModal && <FavouriteModal />}
          </div>
        </nav>
      </header>
    </>
  );
}
