import { useState, useEffect, useContext } from "react";
import { List, Skeleton, Button } from "antd";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Axios from "axios";
import { LoadingContext } from "../hooks/Context";

export default function BuyCardList() {
  const [properties, setProperties] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getProperty = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const res = await Axios.get("/api/properties");
        if (res.data.result) {
          setProperties(res.data.result); // Set the fetched properties to the state
          console.log(res.data.result);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    getProperty(); // Call the function inside useEffect
  }, []);

  return (
    <List
      pagination={{
        pageSize: 6,
      }}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={loading ? Array(6).fill({}) : properties} // Show 6 skeleton cards when loading
      renderItem={(item) => (
        <List.Item>
          {loading ? (
            <Skeleton
              active
              title={false}
              style={{
                height: "230px",
              }}
              paragraph={{ rows: 3 }}
            />
          ) : (
            <PropertyCard
              signedImageUrl={item.signedImageUrl}
              amount={item.amount}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              homeType={item.homeType}
              finishedSquareFeet={item.finishedSquareFeet}
              address1={item.address1}
              address2={item.address2}
              city={item.city}
              state={item.state}
              zipcode={item.zipcode}
              country={item.country}
              actions={[
                <Button
                  key="buy"
                  type="primary"
                  style={{ backgroundColor: "green", borderColor: "green" }}>
                  I'm Intrested
                </Button>,
                <Button
                  key="favourite"
                  type="default"
                  icon={<HeartOutlined />}
                  style={{
                    //backgroundColor: "#ff69b4",
                    borderColor: "#ff69b4",
                  }}>
                  Favourite
                </Button>,
                <Button
                  key="preview"
                  type="dashed"
                  icon={<EyeOutlined />}
                  onClick={() => navigate(`/${item._id}`)}>
                  Preview
                </Button>,
              ]}
            />
          )}
        </List.Item>
      )}
    />
  );
}
