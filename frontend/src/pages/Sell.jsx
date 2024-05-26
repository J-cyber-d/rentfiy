import { useEffect, useState } from "react";
import { List, Typography, Row, Col, Skeleton, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropertyCard from "../components/PropertyCard";
import Property from "./Property";
import { useContext } from "react";
import { LoadingContext, UserContext } from "../hooks/Context";
import LoginPage from "./Login";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
const { Title, Text, Link } = Typography;

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
];

const SellCardList = () => {
  const { authState } = useContext(UserContext);
  const { loading, setLoading, refresh } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperty = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const res = await Axios.get(
          `/api/properties/sell/${authState.userData.userId}`
        );
        if (res.data.result) {
          setProperties(res.data.result); // Set the fetched properties to the state
          console.log(res.data.result);
        }
      } catch (error) {
        console.error("Error fetching properties by Id:", error);
      } finally {
        setLoading(false);
      }
    };

    getProperty(); // Call the function inside useEffect
  }, [authState.isAuthenticated, refresh]);

  return (
    <>
      {authState.isAuthenticated ? (
        <>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 16 }}>
            <Col>
              <Title level={2}>My Properties</Title>
            </Col>
            <Col>
              <Property />
            </Col>
          </Row>
          <List
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
                        type="default"
                        icon={<DeleteOutlined />}>
                        Delete
                      </Button>,
                      <Button
                        key="favourite"
                        type="default"
                        icon={<EditOutlined />}>
                        Edit
                      </Button>,
                      <Button
                        key="preview"
                        type="primary"
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
        </>
      ) : (
        <Row justify="center" align="top" style={{ height: "100vh" }}>
          <Col>
            <Typography>
              <Title level={3} type="primary">
                Please{" "}
                <span>
                  <LoginPage />
                </span>{" "}
                to view your Properties
              </Title>
              <Title level={4}>
                To sell your first property , Please {""}
                <Link
                  onClick={() => navigate("/signup")}
                  style={{
                    fontSize: "25px",
                  }}>
                  Sign up
                </Link>
              </Title>
            </Typography>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SellCardList;
