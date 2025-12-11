import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ImageComponent from "@/components/ImageComponent"

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between bg-slate-950 px-12 text-white lg:h-24">
      <div className="flex items-center gap-4 lg:gap-6">
        <Link to="/">
          <ImageComponent src="/imgs/logo.png" className="w-12 sm:w-16"/>
        </Link>

        <a href="#" className="lg:text-xl">
          Movie
        </a>
        <a href="#" className="lg:text-xl">
          TV Show
        </a>
      </div>
      <div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
      </div>
    </header>
  );
};
export default Header;
