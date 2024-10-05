import axios from "axios";
import "../styles/product_details.scss";
import NavComponent from "./GlobalComponents/Nav_component/Nav";
import { useEffect, useState } from "react";
import { allproducts } from "../Api/apiurl";
import { useParams } from "react-router-dom";
import { Heading } from "./GlobalComponents/Breadcrumbs/breadcrumb";
import { Skeleton } from "antd";
import { StarRating } from "./GlobalComponents/starrating";
import { Button } from "./GlobalComponents/ButtonComponent/button";
import { calculateDiscountPercentage } from "../Api/utiles";
export default function ProductDetails() {
  const { id } = useParams();
  const Paths = [
    { title: "Products", url: "/product" },
    { title: "Details", url: "" },
  ];
  const sizechart = ["S", "M", "L"];
  const [Data, setdata] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: allproducts + id + "/",
    })
      .then((response) => {
        console.log(response, "response");
        setdata(response.data);
      })
      .catch((error) => {});
  }, [id]);
  const [value, setValue] = useState(1);

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (newValue >= 1) {
      setValue(newValue);
    }
  };

  return (
    <div className="Productdetails_main_wrapper">
      <NavComponent type={""} />
      <div className="content_container">
        <Heading paths={Paths} />

        {Data?.id != undefined ? (
          <div className="content row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="left_img">
                <div className="main_img">
                  <div
                    id="carouselExampleControls"
                    class="carousel slide h-100"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner h-100">
                      {Data?.images?.map((ele, index) => {
                        return (
                          <div
                            class={`carousel-item h-100 ${
                              index == 0 ? "active" : ""
                            }`}
                          >
                            <img
                              class="d-block w-100 h-100"
                              src={ele}
                              alt="First slide"
                            ></img>
                          </div>
                        );
                      })}
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <div className="small_imgs">
                  <div class={`item`}>
                    <img
                      class="d-block w-100 h-100"
                      src={Data?.images?.[0]}
                      alt="First slide"
                    ></img>
                  </div>
                  <div class={`item`}>
                    <img
                      class="d-block w-100 h-100"
                      src={Data?.images?.[0]}
                      alt="First slide"
                    ></img>
                  </div>
                  <div class={`item`}>
                    <img
                      class="d-block w-100 h-100"
                      src={Data?.images?.[0]}
                      alt="First slide"
                    ></img>
                  </div>
                  <div class={`item`}>
                    <img
                      class="d-block w-100 h-100"
                      src={Data?.images?.[0]}
                      alt="First slide"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 right">
              <h1>{Data?.title}</h1>
              <p>{Data?.description}</p>
              {Data?.rating && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <StarRating rating={Data?.rating} />
                  <label>({(Data?.rating).toFixed(1)})</label>
                </div>
              )}
              <h2>
                €{Data?.price}
                <span
                  style={{
                    color: "#565959",
                    textDecoration: "line-through",
                    fontSize: "12px",
                    marginTop: "4px",
                    marginLeft: "4px",
                  }}
                >{`€${(Data?.price + Math.random() * 10).toFixed(2)}`}</span>
                <span
                  style={{
                    color: "#000",
                    fontSize: "12px",
                    marginTop: "4px",
                    marginLeft: "4px",
                  }}
                >
                  {`(${calculateDiscountPercentage(
                    (Data?.price + Math.random() * 10).toFixed(2),
                    Data?.price
                  )}% off)`}
                </span>
              </h2>
              <div className="divider"></div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p>Available Size</p>

                  <div style={{ display: "flex", gap: "20px" }}>
                    {sizechart.map((ele) => {
                      return (
                        <button className="button" key={ele}>
                          {ele}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p>Available Color</p>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="radio"
                      style={{ accentColor: "red" }}
                      id="1"
                      checked
                    />{" "}
                    <input
                      type="radio"
                      style={{ accentColor: "black" }}
                      id="2"
                      checked
                    />{" "}
                    <input type="radio" id="3" checked />
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginTop: "20px",
                }}
              >
                {`Last ${Data?.stock} Left-`}
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  Make it Yours
                </span>
              </h3>
              <div className="addtocart">
                <div className="counter-container">
                  <button className="counter-btn" onClick={decrement}>
                    -
                  </button>
                  <input
                    type="number"
                    className="counter-input"
                    value={value}
                    onChange={handleChange}
                    min="1"
                  />
                  <button className="counter-btn" onClick={increment}>
                    +
                  </button>
                </div>
                <Button buttontext={"Add To Cart"} />
              </div>
            </div>
          </div>
        ) : (
          <div className="skleton row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="left_img">
                <div className="main_img">
                  <Skeleton.Image active />
                </div>
                <div className="small_imgs">
                  <Skeleton.Image active />
                  <Skeleton.Image active />
                  <Skeleton.Image active />
                  <Skeleton.Image active />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 right">
              <Skeleton active />
              <div className="divider"></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <Skeleton.Button active /> <Skeleton.Button active />{" "}
                  <Skeleton.Button active />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton.Input active />
                  <div>
                    <Skeleton.Avatar active /> <Skeleton.Avatar active />{" "}
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <Skeleton active />
            </div>
          </div>
        )}
        <div className="row below_content">
          <div className="col-12">
            <div className="marquee-container">
              <div className="marquee ex1 row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-4">
                {/* First Set of Reviews */}
                {Data?.reviews?.map((ele, index) => (
                  <div className="col" key={index}>
                    <div className="card h-100 card-review">
                      <div
                        className="card-header d-flex flex-row justify-content-between align-items-center"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          <img
                            className="rounded-circle me-2"
                            src="https://via.placeholder.com/256/99ccff/fff.png"
                            alt="Reviewer"
                          />
                          <div className="d-flex flex-column justify-content-center align-items-start fs-5 lh-sm">
                            <b className="text-primary">{ele.reviewerName}</b>
                            <small className="text-muted">
                              {ele.date.split("T")[0]}
                            </small>
                          </div>
                        </div>
                        <span className="fs-1 my-0 fw-bolder text-warning">
                          <StarRating rating={ele?.rating} />
                        </span>
                      </div>
                      <div
                        className="card-body py-2"
                        style={{
                          minHeight: "70px",
                          maxHeight: "200px",
                        }}
                      >
                        <p className="card-text">{ele?.comment}</p>
                      </div>
                      <div
                        className="card-footer pt-0 d-flex flex-row align-items-center text-muted"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <span className="me-1">
                          <i className="bi bi-chat-right-text"></i>
                        </span>
                        <small style={{ marginLeft: "10px" }}>1</small>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Duplicate Set of Reviews for Seamless Loop */}
                {Data?.reviews?.map((ele, index) => (
                  <div className="col" key={index + "dup"}>
                    <div className="card h-100 card-review">
                      <div
                        className="card-header d-flex flex-row justify-content-between align-items-center"
                        style={{ border: "none", backgroundColor: "#fff" }}
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          <img
                            className="rounded-circle me-2"
                            src="https://via.placeholder.com/256/99ccff/fff.png"
                            alt="Reviewer"
                          />
                          <div className="d-flex flex-column justify-content-center align-items-start fs-5 lh-sm">
                            <b className="text-primary">{ele.reviewerName}</b>
                            <small className="text-muted">
                              {ele.date.split("T")[0]}
                            </small>
                          </div>
                        </div>
                        <span className="fs-1 my-0 fw-bolder text-warning">
                          <StarRating rating={ele?.rating} />
                        </span>
                      </div>
                      <div
                        className="card-body py-2"
                        style={{
                          minHeight: "70px",
                          maxHeight: "200px",
                        }}
                      >
                        <p className="card-text">{ele?.comment}</p>
                      </div>
                      <div
                        className="card-footer pt-0 d-flex flex-row align-items-center text-muted"
                        style={{ border: "none", backgroundColor: "#fff" }}
                      >
                        <span className="me-1">
                          <i className="bi bi-chat-right-text"></i>
                        </span>
                        <small style={{ marginLeft: "10px" }}>1</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
