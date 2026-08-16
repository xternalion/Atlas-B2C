"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, type NavItem } from "@/constants/NavLinks";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  const toggleDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (!activeDropdown) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeDropdown]);

  const isParentActive = (item: NavItem) =>
    pathname === item.href || pathname.startsWith(item.href + "/");

  const isDropdownActive = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleDropdownClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.includes("#")) {
      const [base, hash] = href.split("#");
      if (pathname === base) {
        e.preventDefault();
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${hash}`);
      }
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <header
      ref={navRef}
      className={`fixed z-40 w-full text-white transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-0 px-4 md:px-8 2xl:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/X.svg"
            alt="Atlas"
            width={120}
            height={20}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5 text-[11px] font-medium">
          {NAV_LINKS.map((item) => (
            <li
              key={item.key}
              className="relative"
              onMouseEnter={() => item.dropdown && openDropdown(item.key)}
              onMouseLeave={() => item.dropdown && scheduleClose()}
            >
              <Link
                href={item.href}
                onClick={(e) => {
                  if (item.dropdown) {
                    e.preventDefault();
                    toggleDropdown(item.key);
                  } else if (item.href.includes("#")) {
                    handleDropdownClick(e, item.href);
                  }
                }}
                className={`relative flex items-center gap-1 py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isParentActive(item)
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown
                    size={11}
                    className={`opacity-50 transition-transform duration-200 ${
                      activeDropdown === item.key ? "rotate-180" : ""
                    }`}
                  />
                )}
                {isParentActive(item) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[#dd9e5e]" />
                )}
              </Link>

              {/* Dropdown panel */}
              {item.dropdown && (
                <div
                  onMouseEnter={() => openDropdown(item.key)}
                  onMouseLeave={scheduleClose}
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 origin-top ${
                    activeDropdown === item.key
                      ? "opacity-100 scale-y-100 pointer-events-auto"
                      : "opacity-0 scale-y-95 pointer-events-none"
                  }`}
                >
                  <div className="w-44 rounded-2xl bg-[#0d0d0d] border border-white/10 shadow-2xl p-1.5 flex flex-col">
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.key}
                        href={d.href}
                        onClick={(e) => handleDropdownClick(e, d.href)}
                        className={`flex items-center px-3 py-2 rounded-xl text-[11px] transition-all duration-150 ${
                          isDropdownActive(d.href)
                            ? "text-white bg-white/[0.07]"
                            : "text-white/55 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link href="/software#get-started-pricing" className="hidden md:flex items-center btn-primary-sm">
            Get Started
          </Link>
          <div className="flex lg:hidden w-px h-4 bg-white/30" />
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden w-fit h-10 flex items-center justify-center"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`absolute top-full left-3 right-3 mt-1.5 lg:hidden rounded-3xl bg-black/85 backdrop-blur-3xl border border-white/8 overflow-hidden transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="h-px w-full" />
        <ul className="flex flex-col p-4 gap-0.5">
          {NAV_LINKS.map((item) => (
            <li key={item.key}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.key ? null : item.key,
                      )
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13.5px] transition-all duration-150 ${
                      isParentActive(item)
                        ? "text-white bg-white/[0.07]"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`text-white/40 transition-transform duration-200 ${
                        mobileExpanded === item.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileExpanded === item.key
                        ? "max-h-64 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-4 mt-0.5 flex flex-col gap-0.5 pb-1">
                      {item.dropdown.map((d) => (
                        <li key={d.key}>
                          <Link
                            href={d.href}
                            onClick={(e) => handleDropdownClick(e, d.href)}
                            className="flex items-center px-4 py-2.5 rounded-xl text-[12px] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
                          >
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={(e) =>
                    item.href.includes("#")
                      ? handleDropdownClick(e, item.href)
                      : setIsOpen(false)
                  }
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[13.5px] transition-all duration-150 ${
                    isParentActive(item)
                      ? "text-white bg-white/[0.07]"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isParentActive(item) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd9e5e]" />
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
