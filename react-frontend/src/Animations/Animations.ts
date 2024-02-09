export const fadeBoxIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 5 } },
  };
  
  export const slideInMenu = {
    hidden: { x: "-208px", opacity: 0 },
    visible: { x: "0", opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { x: "-100vw", opacity: 0 },
  };
  
  export const slideInHeader = {
    hidden: { x: "0", opacity: 1 },
    visible: { x: "208px", opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { x: "-100vw", opacity: 0 },
  };