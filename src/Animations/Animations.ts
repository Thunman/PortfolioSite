export const fadeBoxIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };
  
  export const slideInMenu = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { duration: 0.1, ease: "linear" } },
    exit: { x: "-100vw", opacity: 0 },
  };
  
  export const slideInHeader = {
    hidden: { x: "0", opacity: 1 },
    visible: { y: "64px", opacity: 1, transition: { duration: 0.1, ease: "linear" } },
    exit: { x: "-100vw", opacity: 0 },
  };