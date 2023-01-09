import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";

interface LayoutProps {
  background?: string;
}

const Layout = ({
  children,
  background,
}: React.PropsWithChildren<LayoutProps>): JSX.Element => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const value = (
    <ParallaxProvider>
      <div className="h-full overflow-hidden">
        <div className={`${background ?? "bg-neutral-pearl"} relative`}>
          <div id="smooth-wrapper" className={`${background}`}>
            <div id="smooth-content">
              <main className="bg-transparent">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );

  return value;
};

export default Layout;
