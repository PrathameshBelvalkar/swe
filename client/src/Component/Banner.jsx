import React, { useEffect, useState } from "react";
import img1 from "../assets/tim-mossholder-jBK5235avoE-unsplash.jpg";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchBannerData = async () => {
      try {
        const response = await fetch("http://localhost:3400/api/banners");
        const data = await response.json();
        setBanners(data);
        console.log(data.length);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="backimg">
      <div className="m-5">
        {banners.map((banner) => (
          <div key={banner.id} className="container-fluid d-flex align-items-center justify-content-center vh-100 parent mb-4">
            {banner.banner_visibilty === "1" && (
              <div className="banner row d-flex p-4 rounded shadow-lg text-center text-white">
                <div className="imgcontainer mb-3 col-7">
                  <img src={img1} alt="Banner" className="img-fluid rounded" />
                </div>
                <div className="col-5 m-0 p-0">
                  <div className="mb-2 bg-secondary m-1 p-3">{banner.banner_desc}</div>
                  <a
                    href={banner.banner_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary"
                  >
                    Click here
                  </a>
                  <div className="countdown mt-3 p-2 bg-dark rounded">
                    {new Date(banner.banner_timer).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
