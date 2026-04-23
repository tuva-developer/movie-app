import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import HomeIntro from "@/components/HomeIntro";

const shouldPlayHomeIntro = (pathname: string) =>
  pathname === "/" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const RootLayout = () => {
  const location = useLocation();
  const [showHomeIntro, setShowHomeIntro] = useState(() =>
    shouldPlayHomeIntro(location.pathname),
  );
  const [introKey, setIntroKey] = useState(0);

  useEffect(() => {
    if (!shouldPlayHomeIntro(location.pathname)) {
      setShowHomeIntro(false);
      return;
    }

    setShowHomeIntro(true);
    setIntroKey((current) => current + 1);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      {showHomeIntro && (
        <HomeIntro key={introKey} onFinish={() => setShowHomeIntro(false)} />
      )}

      <div
        className={`transition-opacity duration-700 ${
          showHomeIntro ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Header />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default RootLayout;
