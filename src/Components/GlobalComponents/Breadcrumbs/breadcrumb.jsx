import React, { useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import useDebouncedEffect from "use-debounced-effect";

const Heading = (props) => {
  const {
    setSearch,
    paths,
    addons = [],
    typeOfParent,
    setStatus,
    searchValue,
  } = props;

  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  const navigate = useNavigate();

  const handleClick = (url) => {
    if (typeOfParent === "myContacts") {
      navigate(url);
    }
    if (typeOfParent === "ADD CONTACTS") {
      setStatus(true);
    } else {
      navigate(url);
    }
  };

  useDebouncedEffect(
    () => {
      console.log(debouncedSearch);
      setSearch(debouncedSearch);
    },
    300,
    [debouncedSearch]
  );
  return (
    <div className="headingSection">
      <div className="rightSection">
        <div className="breadcrumbs">
          {paths.map((path, index, paths) => (
            <div key={path.title}>
              <span
                onClick={() => path.url.length > 0 && handleClick(path.url)}
                style={{
                  opacity: index === paths.length - 1 ? 1 : 0.6,
                  textDecoration:
                    index !== paths.length - 1 ? "none" : "inherit",
                  cursor: index === paths.length - 1 ? "default" : "pointer",
                  fontWeight: "400",
                }}
              >
                {path.title}
              </span>
              {index !== paths.length - 1 && (
                <>
                  &nbsp;<span>/</span>&nbsp;
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {addons.includes("search") && (
        <div className="leftSection">
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
};

export { Heading };
