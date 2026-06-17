import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Images/FinalLogo2.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className="flex flex-col bg-transparent border-b border-[rgba(6,182,212,0.15)] sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-center">
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
          </Link>

          {/* Desktop Navigation links */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <>
                      <div
                        className={`group relative flex cursor-pointer items-center gap-1 text-sm transition-colors duration-150 ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-[#06b6d4]"
                            : "text-[#94a3b8] hover:text-[#f0f9ff]"
                        }`}
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-[4px] border border-[rgba(6,182,212,0.15)] bg-[#0c1a2e] p-4 text-[#f0f9ff] opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded-[4px] bg-[#0c1a2e]"></div>
                          {loading ? (
                            <p className="text-center text-[#94a3b8] text-sm">Loading...</p>
                          ) : subLinks.length ? (
                            <>
                              {subLinks
                                ?.filter((subLink) => subLink?.courses?.length >= 0)
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-[4px] bg-transparent py-4 pl-4 text-sm text-[#94a3b8] transition-colors duration-150 hover:text-[#06b6d4]"
                                    key={i}
                                  >
                                    <p className="text-center">{subLink.name}</p>
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="text-center text-[#94a3b8] text-sm">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`text-sm transition-colors duration-150 ${
                          matchRoute(link?.path)
                            ? "text-[#06b6d4]"
                            : "text-[#94a3b8] hover:text-[#f0f9ff]"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Login / Signup / Dashboard */}
          <div className="hidden items-center gap-x-4 md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-[#94a3b8] transition-colors duration-150 hover:text-[#06b6d4]" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-[4px] bg-[#06b6d4] text-center text-xs font-bold text-[#060d1a]">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login">
                <button className="rounded-[4px] border border-[rgba(6,182,212,0.15)] bg-transparent px-4 py-1.5 text-sm text-[#94a3b8] transition-all duration-150 hover:border-[#06b6d4] hover:text-[#06b6d4]">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="rounded-[4px] border border-[#06b6d4] bg-transparent px-4 py-1.5 text-sm font-semibold text-[#06b6d4] transition-all duration-150 hover:bg-[#06b6d4] hover:text-[#060d1a]">
                  Sign up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropdown />}
          </div>

          {/* Hamburger Button */}
          <button className="mr-4 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col bg-[#0c1a2e] border-t border-[rgba(6,182,212,0.15)] px-6 py-4 gap-4 md:hidden">
          {NavbarLinks.map((link, index) => (
            <Link
              key={index}
              to={link?.path || "#"}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm transition-colors duration-150 ${
                matchRoute(link?.path)
                  ? "text-[#06b6d4]"
                  : "text-[#94a3b8] hover:text-[#06b6d4]"
              }`}
            >
              {link.title}
            </Link>
          ))}

          {/* Mobile Catalog Sublinks */}
          {subLinks.length > 0 && (
            <div className="flex flex-col gap-2 pl-4 border-l border-[rgba(6,182,212,0.15)]">
              {subLinks
                ?.filter((subLink) => subLink?.courses?.length >= 0)
                ?.map((subLink, i) => (
                  <Link
                    key={i}
                    to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-[#94a3b8] hover:text-[#06b6d4] transition-colors duration-150"
                  >
                    {subLink.name}
                  </Link>
                ))}
            </div>
          )}

          <div className="flex flex-col gap-3 mt-2">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" onClick={() => setMobileMenuOpen(false)} className="relative w-fit">
                <AiOutlineShoppingCart className="text-2xl text-[#94a3b8] hover:text-[#06b6d4]" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-[4px] bg-[#06b6d4] text-xs font-bold text-[#060d1a]">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full rounded-[4px] border border-[rgba(6,182,212,0.15)] bg-transparent px-4 py-2 text-sm text-[#94a3b8] hover:border-[#06b6d4] hover:text-[#06b6d4]">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full rounded-[4px] border border-[#06b6d4] bg-transparent px-4 py-2 text-sm font-semibold text-[#06b6d4] hover:bg-[#06b6d4] hover:text-[#060d1a]">
                  Sign up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropdown />}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar