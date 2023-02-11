import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { searchHandler } from "../../features/counter/handlerSlice";
import { useNavigate } from "react-router-dom";

import "./Search.css";
import { getPosts } from "../../features/counter/fetchSlice";
import { addToSearched } from "../../features/counter/itemsSlice";

function Search() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { fetchData, loading } = useSelector((state) => state.fetchData);

  const [searchedInfo, setSearchedInfo] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    if (loading === "idle") {
      dispatch(getPosts());
    }
  }, [dispatch, loading]);

  const removeSearch = () => {
    dispatch(searchHandler(false));
  };

  const searchInfo = (e) => {
    setSearchedInfo(e.target.value.toLowerCase());
    setSearchedItems(
      [...fetchData].filter((item) => {
        if (
          item.title.toLowerCase().trim().includes(searchedInfo) ||
          item.description.toLowerCase().trim().includes(searchedInfo) ||
          item.category.toLowerCase().trim().includes(searchedInfo)
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  const showSearched = () => {
    if (!searchedItems[0] && searchedInfo !== " ") {
      dispatch(addToSearched([{ message: "Brak wyników wyszukiwania" }]));
    } else if (searchedInfo !== " ") {
      dispatch(addToSearched(searchedItems));
    } else {
      dispatch(addToSearched([]));
    }
    navigate("/all-products");
    dispatch(searchHandler(false));
  };

  return (
    <div className="search">
      <SearchOutlinedIcon
        onClick={showSearched}
        className="search__loupe"
        sx={{ fontSize: 30 }}
      />
      <div className="search__input">
        <input
          onChange={searchInfo}
          type="text"
          placeholder="Szukaj produktów"
        />
      </div>
      <CloseIcon
        onClick={removeSearch}
        className="search__x"
        fontSize="large"
      />
    </div>
  );
}

export default Search;
