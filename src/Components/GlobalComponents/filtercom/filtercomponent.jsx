import React, { useEffect, useState } from "react";
import "./style.scss";
import useDebouncedEffect from "use-debounced-effect";
import search from "../../../assets/product/searchIcon.svg";
import { Select, Space } from "antd";

function FilterComponent(props) {
  const {
    setSearch,
    searchValue,
    filerList,
    selectedFilter,
    setSelectedFilter,
    addons = [],
    style,
    setsort,
  } = props;
  const [startIndex, setStartIndex] = useState(0);
  console.log(startIndex, "startIndex");
  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  const ITEMS_PER_PAGE = 3;
  const handleForward = () => {
    if (startIndex + ITEMS_PER_PAGE < filerList.length) {
      setStartIndex(startIndex + ITEMS_PER_PAGE);
    }
  };

  const handleBack = () => {
    if (startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex(startIndex - ITEMS_PER_PAGE);
    }
  };

  useEffect(() => {
    const index = filerList.findIndex((ele) => ele.title === selectedFilter);

    console.log(index);
    if (index !== -1) {
      const pageStart = Math.floor(index / ITEMS_PER_PAGE) * ITEMS_PER_PAGE;
      setStartIndex(pageStart);
    }
  }, [selectedFilter]);
  useDebouncedEffect(
    () => {
      console.log(debouncedSearch);
      setSearch(debouncedSearch);
    },
    300,
    [debouncedSearch]
  );
  return (
    <div className="mainFilter" style={style}>
      <div className="rightSection">
        <button type="button" onClick={handleBack} disabled={startIndex === 0}>
          {"<"}
        </button>

        {filerList
          ?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
          .map((item, index) => {
            if (item != null) {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(item.title);
                  }}
                >
                  <span
                    style={{
                      background:
                        selectedFilter === item.title
                          ? "rgba(95, 85, 236,1)"
                          : "#ffffff",
                      color: selectedFilter === item.title ? "#ffffff" : "#000",
                      border: `1.5px solid ${item.color}`,
                      fontSize: "16px",
                      fontWeight: 400,
                      textTransform: "capitalize",
                      textWrap: "nowrap",
                    }}
                  >
                    {item.title}
                  </span>
                </button>
              );
            }
          })}
        <button
          type="button"
          onClick={handleForward}
          disabled={startIndex + ITEMS_PER_PAGE >= filerList.length}
        >
          {">"}
        </button>
      </div>
      {addons.includes("search") && (
        <div className="leftSection">
          <label>Sort By</label>
          <Select
            defaultValue="none"
            style={{
              width: 150,
              height: 38,
            }}
            onChange={(e) => {
              setsort(e);
            }}
            options={[
              {
                value: null,
                label: "none",
              },
              {
                value: "asc",
                label: "Ascending",
              },
              {
                value: "desc",
                label: "Descending",
              },
            ]}
          />
          <div className="search">
            <img src={search} alt="search" />
            <input
              type="text"
              placeholder="Search....."
              onChange={(e) => setDebouncedSearch(e.target.value)}
              style={{ border: "none" }}
              value={debouncedSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { FilterComponent };
