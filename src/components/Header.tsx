import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = () => {
  return (
    <header className="flex h-14 lg:h-20 items-center justify-between bg-slate-950 px-8 text-white">
        <div className="flex items-center gap-4 lg:gap-6">
          <img
            src="./imgs/netflix.png"
            alt="netflix"
            className="w-16 sm:w-28"
          />
          <a href="#" className="lg:text-xl">Movie</a>
          <a href="#" className="lg:text-xl">TV Show</a>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="cursor-pointer"
          />
        </div>
      </header>
  )
}
export default Header