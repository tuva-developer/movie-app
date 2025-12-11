import { useEffect, useState, type ReactNode } from "react";
import { ModalContext } from "@/contexts/ModalContext";

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isShowing]);

  return (
    <ModalContext.Provider
      value={{
        setIsShowing,
        setContent,
      }}
    >
      {children}
      {isShowing && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
            onClick={() => setIsShowing(false)}
          >
            <p>{content}</p>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
