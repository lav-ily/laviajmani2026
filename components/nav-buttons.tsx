const navItems = [
  { label: "About", href: "#about", mobileLabel: "About Lavi", showMobile: true },
  { label: "Research", href: "#research", showMobile: false },
  { label: "Contact", href: "#contact", mobileLabel: "Contact", showMobile: true },
];

export function NavButtons() {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 w-full max-w-[543px] mt-4 lg:mt-4">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`
            flex-1 flex items-center justify-center
            bg-[rgba(255,255,255,0.05)] rounded-full
            h-[39px]
            font-sans font-light
            text-[12px] md:text-[14px] lg:text-[16px]
            text-white text-center
            tracking-[-0.48px]
            transition-colors hover:bg-[rgba(255,255,255,0.1)]
            ${item.showMobile ? "" : "hidden lg:flex"}
          `}
        >
          <span className="lg:hidden">{item.mobileLabel || item.label}</span>
          <span className="hidden lg:inline">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
