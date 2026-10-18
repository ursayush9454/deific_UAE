// import * as React from "react";
// import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
// import { cva } from "class-variance-authority";
// import { ChevronDown } from "lucide-react";

// import { cn } from "@/lib/utils";

// const NavigationMenu = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
// >(({ className, children, ...props }, ref) => (
//   <NavigationMenuPrimitive.Root
//     ref={ref}
//     className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
//     {...props}
//   >
//     {children}
//     <NavigationMenuViewport />
//   </NavigationMenuPrimitive.Root>
// ));
// NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

// const NavigationMenuList = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.List>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
// >(({ className, ...props }, ref) => (
//   <NavigationMenuPrimitive.List
//     ref={ref}
//     className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
//     {...props}
//   />
// ));
// NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

// const NavigationMenuItem = NavigationMenuPrimitive.Item;

// const navigationMenuTriggerStyle = cva(
//   "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
// );

// const NavigationMenuTrigger = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
// >(({ className, children, ...props }, ref) => (
//   <NavigationMenuPrimitive.Trigger
//     ref={ref}
//     className={cn(navigationMenuTriggerStyle(), "group", className)}
//     {...props}
//   >
//     {children}{" "}
//     <ChevronDown
//       className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
//       aria-hidden="true"
//     />
//   </NavigationMenuPrimitive.Trigger>
// ));
// NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

// const NavigationMenuContent = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
// >(({ className, ...props }, ref) => (
//   <NavigationMenuPrimitive.Content
//     ref={ref}
//     className={cn(
//       "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
//       className,
//     )}
//     {...props}
//   />
// ));
// NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

// const NavigationMenuLink = NavigationMenuPrimitive.Link;

// const NavigationMenuViewport = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
// >(({ className, ...props }, ref) => (
//   <div className={cn("absolute left-0 top-full flex justify-center")}>
//     <NavigationMenuPrimitive.Viewport
//       className={cn(
//         "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
//         className,
//       )}
//       ref={ref}
//       {...props}
//     />
//   </div>
// ));
// NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

// const NavigationMenuIndicator = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
// >(({ className, ...props }, ref) => (
//   <NavigationMenuPrimitive.Indicator
//     ref={ref}
//     className={cn(
//       "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
//       className,
//     )}
//     {...props}
//   >
//     <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
//   </NavigationMenuPrimitive.Indicator>
// ));
// NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

// export {
//   navigationMenuTriggerStyle,
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
//   NavigationMenuContent,
//   NavigationMenuTrigger,
//   NavigationMenuLink,
//   NavigationMenuIndicator,
//   NavigationMenuViewport,
// };
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Base components (unchanged) ──────────────────────────────────────────
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

// ─── Custom Mega‑Menu for “Services” ──────────────────────────────────────

/**
 * A dedicated Services dropdown that mimics the innotical.com mega‑menu.
 * Use this inside a <NavigationMenuItem>.
 */
export function ServicesDropdown() {
  return (
    <NavigationMenuPrimitive.Root delayDuration={0}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white hover:text-gray-300 data-[state=open]:bg-transparent data-[state=open]:text-white">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen max-w-6xl p-6 bg-white shadow-lg rounded-xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 – Mobile App Design */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Mobile App Design
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="/android-app-development"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        Android App Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="/ios-app-development"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        iOS App Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="/react-js-development"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        React JS Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="/hybrid-app-development"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        Hybrid App Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="/cross-platform-app-development"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        Cross‑Platform App Development
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 2 – MVP Development */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    MVP Development
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="/mvp-development"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        Minimum Viable Product (MVP)
                      </a>
                    </li>
                    <li className="text-gray-500 text-xs leading-relaxed mt-1">
                      Innotical's MVP development services are designed to cater
                      to a diverse range of businesses, offering customized
                      solutions to meet your specific requirements.
                    </li>
                  </ul>
                </div>

                {/* Column 3 – Startup Idea Validation */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Startup Idea Validation
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="/startup-idea-validation"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        Startup Valuation &amp; Validation
                      </a>
                    </li>
                    <li className="text-gray-500 text-xs leading-relaxed mt-1">
                      Startup valuation is the process of determining the worth
                      of a startup company. This is typically done to help the
                      company raise capital, secure financing, or attract
                      investment.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuPrimitive.Root>
  );
}

// ─── Full Header Example ──────────────────────────────────────────────────

/**
 * Example header that uses the updated navigation and the Services mega‑menu.
 * Drop this into your layout to get the innotical.com‑style navbar.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1a1a2e] text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold tracking-tight">
              <span className="text-red-500">Innotical</span>
              <span className="text-gray-300">.</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Services – uses the mega‑menu */}
                <NavigationMenuItem>
                  <ServicesDropdown />
                </NavigationMenuItem>

                {/* Work & Clients */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-gray-300 data-[state=open]:bg-transparent data-[state=open]:text-white">
                    Work &amp; Clients
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-56 p-4 bg-white shadow-lg rounded-xl border border-gray-100">
                      <ul className="space-y-2 text-sm">
                        <li>
                          <a
                            href="/client-industries"
                            className="block text-gray-600 hover:text-red-600 transition-colors"
                          >
                            Client &amp; Industries
                          </a>
                        </li>
                        <li>
                          <a
                            href="/casestudies"
                            className="block text-gray-600 hover:text-red-600 transition-colors"
                          >
                            Case Studies
                          </a>
                        </li>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-600/25"
            >
              Get A Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1a2e] border-t border-white/10 py-4 px-4">
          <nav className="flex flex-col space-y-3">
            <a href="/services" className="text-white hover:text-gray-300">
              Services
            </a>
            <a href="/work" className="text-white hover:text-gray-300">
              Work &amp; Clients
            </a>
            <a href="/about" className="text-white hover:text-gray-300">
              About
            </a>
            <a href="/contact" className="text-white hover:text-gray-300">
              Contact
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors w-full"
            >
              Get A Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}