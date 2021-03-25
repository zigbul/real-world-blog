import { useState, useEffect } from 'react';

export function useLocalStorage(key) {
   const [state, setState] = useState(() => {
      let value; 
      try {
         value = JSON.parse(window.localStorage.getItem(key));
      } catch (e) {
         console.log(e);
      }
      return value;
   });

   useEffect(() => {
      window.localStorage.setItem(key, state);
   }, [state, key]);

   return [state, setState]
}