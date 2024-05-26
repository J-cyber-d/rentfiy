import { Card, Row, Col, Button, Typography, Image } from "antd";

import { AmountFormat } from "../utils/CommonFormat";

const { Title, Text } = Typography;

export default function PropertyCard({
  amount,
  bedrooms,
  bathrooms,
  homeType,
  finishedSquareFeet,
  address1,
  address2,
  city,
  state,
  zipcode,
  country,
  signedImageUrl,
  actions,
}) {
  return (
    <div>
      <Card
        hoverable={true}
        style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }} // Add border and border-radius
        actions={actions}
        cover={<Image alt="example" src={signedImageUrl} />}>
        <Row>
          <Col span={24}>
            <Title level={4} style={{ marginBottom: 0, marginTop: 0 }}>
              {AmountFormat(amount) || "₹0.00"}
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Title level={5} style={{ marginTop: "5px" }}>
              {bedrooms} bds | {bathrooms} ba | {finishedSquareFeet} sqft -{" "}
              {homeType}
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: 0 }}>
            <Text>{`${address1}${
              address2 ? ", " + address2 : ""
            }, ${city}, ${state} ${zipcode}, ${country}`}</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
