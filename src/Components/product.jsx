import { useEffect, useRef, useState } from "react";
import "../styles/product_page.scss";
import { FilterComponent } from "./GlobalComponents/filtercom/filtercomponent";
import NavComponent from "./GlobalComponents/Nav_component/Nav";
import axios from "axios";
import {
  allproducts,
  allproductssearch,
  categories,
  specificcategory,
} from "../Api/apiurl";
import { Skeleton } from "antd";
import { useInView } from "react-intersection-observer";
import { StarRating } from "./GlobalComponents/starrating";
import { Button } from "./GlobalComponents/ButtonComponent/button";
import { useNavigate } from "react-router-dom";
import { calculateDiscountPercentage, truncateText } from "../Api/utiles";

export default function Product() {
  const [ViewType, setViewType] = useState("gridView");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [Data, setData] = useState([]);
  const [Count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [fileList, setFileList] = useState([{ title: "All", name: "All" }]);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(false);
  const [sort, setsort] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData([]);
    fetchData(limit);
  }, [selectedFilter, limit, search, sort]);

  const fetchData = (start) => {
    setLoading(true);

    const params = {
      limit: limit,
      q: search != "" ? search : null,
      order: sort != null ? sort : null,
      sortBy: sort != null ? "title" : null,
    };
    let url =
      selectedFilter === "All"
        ? search != ""
          ? allproductssearch
          : allproducts
        : `${specificcategory}${selectedFilter}/`;

    axios
      .get(url, { params })
      .then((response) => {
        console.log(response, "response");
        setData(response?.data?.products);
        setCount(response?.data?.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: categories,
    })
      .then((response) => {
        console.log(response, "response");
        response.data.map((item) => {
          setFileList((prev) => [...prev, { title: item, name: item }]);
        });
      })
      .catch((error) => {});
  }, []);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      if (limit + 9 <= Count) {
        setLimit(limit + 9);
      } else {
        setLimit(Count);
      }
    }
  }, [inView]);

  return (
    <div className="product_main_wrapper">
      <NavComponent type={""} />
      <div className="product_page_wrapper">
        <div className="content_wrapper row">
          <div className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 filter">
            <div className="filter_header">
              <div className="icon">
                <i class="bi bi-funnel"></i>
              </div>
              <p>Filter</p>
            </div>
            <div className="category_list">
              <h4>Category</h4>
              <div className="list">
                {fileList.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedFilter(ele.name)}
                    >
                      <input
                        type="checkbox"
                        name="category"
                        id={ele.name}
                        checked={selectedFilter === ele.name}
                        style={{ marginRight: "10px" }}
                      />
                      <label htmlFor={ele.name}>{ele.title}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 content">
            <FilterComponent
              addons={["search"]}
              filerList={fileList}
              setSelectedFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
              buttonTitle={"Add Property"}
              setSearch={setSearch}
              searchValue={search}
              setsort={setsort}
              buttonFunction={() => {
                setIsOpen(true);
              }}
            />

            <div
              style={{
                // height: 'calc(100% - 153px)',
                overflowY: "auto",
                borderRadius: "15px",
                height: " calc(100% - 80px)",
              }}
            >
              <div
                className={`myPropertyBody ${
                  ViewType === "gridView" && "flexStart"
                } `}
                style={{
                  height: ViewType !== "gridView" && "100%",
                  background: ViewType !== "gridView" && "white",
                  margin: "0 auto",
                }}
              >
                <>
                  {Data?.length > 0
                    ? Data?.map((item, index) => (
                        <div
                          key={`${index}`}
                          className="card"
                          // style={{ width: '100%', height: '100vh' }}
                          onClick={(e) => {
                            navigate(`/product/${item?.id}`);
                          }}
                        >
                          <div
                            className="backgroundClass"
                            style={{
                              backgroundImage: `url(${item?.images?.[0]})`,
                            }}
                          >
                            <div className="icon">
                              <i class="bi bi-heart"></i>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          ></div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "15px",
                              width: "100%",
                            }}
                          >
                            <div className="cardFooter">
                              <h1 className="first">
                                {truncateText(item?.title, 35)}
                              </h1>
                              <div style={{ display: "flex", gap: "6px" }}>
                                {" "}
                                <StarRating rating={item?.rating} />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    marginTop: "4px",
                                  }}
                                >
                                  {`(${(Math.random() * 100).toFixed(2)})`}{" "}
                                </span>
                              </div>
                              <p className="second">
                                {`€${item?.price}`}{" "}
                                <span
                                  style={{
                                    color: "#565959",
                                    textDecoration: "line-through",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                  }}
                                >{`€${(
                                  item?.price +
                                  Math.random() * 10
                                ).toFixed(2)}`}</span>
                                <span
                                  style={{
                                    color: "#000",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                  }}
                                >
                                  {`(${calculateDiscountPercentage(
                                    (item?.price + Math.random() * 10).toFixed(
                                      2
                                    ),
                                    item?.price
                                  )}% off)`}
                                </span>
                              </p>
                              <Button
                                buttontext={"Add To Cart"}
                                styles={{ width: "100%", boxShadow: "none" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    : Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="card propertySkelton">
                          <div className="backgroundClass">
                            <Skeleton.Image active />
                          </div>
                          <div className="backgroundClass">
                            <Skeleton active />
                          </div>
                        </div>
                      ))}
                  <div ref={ref} style={{ height: "1px" }} />
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
