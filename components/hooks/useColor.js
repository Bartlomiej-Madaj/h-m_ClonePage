import { useEffect, useState } from "react";

export const useColor = () => {
    const [randomColor, setRandomColor] = useState();

    useEffect(() => {
        setRandomColor(Math.floor(Math.random() * 1000))
      }, [])

      return randomColor
}

