"use client"

// import { siteConfig } from "@/app/siteConfig" --- potom přidat
import useScroll from "@/lib/useScroll"
import { cn } from "@/lib/utils"
import { RiCloseFill, RiMenuFill } from "@remixicon/react"
import Link from "next/link"
import React from "react"
// import { SolarLogo } from "../../../public/SolarLogo" --- logo
import { Button } from "../Button"

const links = {
  forSale: {
    name: "Nabídka vozů",
    link: "/",
  },
  sold: {
    name: "Prodané",
    link: "/sold",
  },
  about: {
    name: "O nás",
    link: "/about",
  },
  contact: {
    name: "Kontakt",
    link: "/contact",
  },
  order: {
    name: "Auto na přání",
    link: "/order-car",
  },
}

export function NavBar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(15)

  return (
    <header
      className={cn(
        "sticky inset-x-4 top-4 z-50 mx-auto flex max-w-7xl justify-center rounded-lg border border-transparent px-3 py-3 transition duration-300",
        scrolled || open
          ? "border-gray-200/50 bg-white/80 shadow-2xl shadow-black/5 backdrop-blur-sm"
          : "bg-white/0",
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          {/* <Link href={siteConfig.baseLinks.home} aria-label="Home"> */}
          <Link href="/" aria-label="Home">
            {/* <span className="sr-only">Solar Tech Logo</span> */}
            <span className="text-gray-900 text-4xl">CarVerzo</span>
            {/* <SolarLogo className="w-22" /> */}
          </Link>
          <nav className="hidden sm:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-10 font-medium">
            <Link className="px-2 py-1 text-gray-900" href={links.forSale.link}>
              {links.forSale.name}
            </Link>
            <Link className="px-2 py-1 text-gray-900" href={links.sold.link}>
              {links.sold.name}
            </Link>
            <Link className="px-2 py-1 text-gray-900" href={links.about.link}>
              {links.about.name}
            </Link>
            <Link className="px-2 py-1 text-gray-900" href={links.contact.link}>
              {links.contact.name}
            </Link>
            </div>
          </nav>
          <Button variant="secondary" className="hidden h-10 font-semibold sm:block">
            <Link className="px-2 py-1 text-gray-900" href={links.order.link}>
              {links.order.name}
            </Link>
          </Button>

          <Button
            onClick={() => setOpen(!open)}
            variant="secondary"
            className="p-1.5 sm:hidden"
            aria-label={open ? "CloseNavigation Menu" : "Open Navigation Menu"}
          >
            {!open ? (
              <RiMenuFill
                className="size-6 shrink-0 text-gray-900"
                aria-hidden
              />
            ) : (
              <RiCloseFill
                className="size-6 shrink-0 text-gray-900"
                aria-hidden
              />
            )}
          </Button>
        </div>
        <nav
          className={cn(
            "mt-6 flex flex-col gap-6 text-lg ease-in-out will-change-transform sm:hidden",
            open ? "" : "hidden",
          )}
        >
          <ul className="space-y-4 font-medium">
          <li onClick={() => setOpen(false)}>
            <Link href={links.forSale.link}>{links.forSale.name}</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href={links.sold.link}>{links.sold.name}</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href={links.about.link}>{links.about.name}</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href={links.contact.link}>{links.contact.name}</Link>
          </li>
          </ul>
          <Button variant="secondary" className="text-lg">
            {links.order.name}
          </Button>
        </nav>
      </div>
    </header>
  )
}
