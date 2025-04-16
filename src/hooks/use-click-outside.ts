
import { useEffect, RefObject } from "react";

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  exceptRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      const exceptEl = exceptRef?.current;
      
      // Do nothing if clicking ref's element or descendent elements
      if (
        !el || 
        el.contains(event.target as Node) || 
        (exceptEl && exceptEl.contains(event.target as Node))
      ) {
        return;
      }
      
      handler(event);
    };
    
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, exceptRef]);
};
