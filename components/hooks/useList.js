import { useState, useEffect } from "react";
import { herSubMenuArray } from "../../data/dummy_data";

export const useList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(
      herSubMenuArray.slice(Math.floor(Math.random() * herSubMenuArray.length))
    );
  }, []);

  return list;
};
