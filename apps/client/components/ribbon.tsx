import { useState } from "react";
import { cn } from "../utility/cn";
import {motion} from "motion/react";

export function Ribbon({className, onClickHandler}:{className?:string, onClickHandler: ()=>void}){

     const [isFavorite, setIsFavorite] = useState(false);
    const shortPath = "M19 18c-2.5-1.5-4.5-1.5-7 0s-4.5 1.5-7 0V5.5C5 4 6 3 8 3h8c2 0 3 1 3 2.5v12.5z";
  
  // Path 2: The clicked state — longer and more "melted/wavy" at the bottom
  const longWavyPath = "M19 22c-3.5-2.5-5.5-0.5-7-1s-3.5 1.5-7 1V5.5C5 4 6 3 8 3h8c2 0 3 1 3 2.5v16.5z";


    return (
            
      <motion.svg
        width="20"
        height="30"
        viewBox="0 0 24 24"
        onClick={() => setIsFavorite(!isFavorite)}
        initial={false}
        animate={{
          scale: isFavorite ? 1.1 : 1
        }}
        whileTap={{ scale: 0.9, rotate: -5 }} // Gives it a little physical "crunch"
        style={{ cursor: 'pointer' }}
      
      >
        <motion.path
          d={shortPath}
          animate={{ 
            d: isFavorite ? longWavyPath : shortPath,
            fill: isFavorite ? "#4ade80" : "rgba(0,0,0,0)",
            stroke: isFavorite ? "#22c55e" : "#6b7280",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 12 // Lower damping makes it "wiggle" or wave more before settling
          }}

          whileHover={{
            stroke: "var(--color-emerald-400)"
          }}
         
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    
    )
}

