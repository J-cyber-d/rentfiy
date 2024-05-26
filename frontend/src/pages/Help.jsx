import React from "react";
import { Typography, Collapse, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default function HelpPage() {
  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Help & Support</Title>
            <Paragraph>
              Welcome to the Rentlify Help & Support page. Here you can find
              answers to common questions and learn how to get the most out of
              our app.
            </Paragraph>
          </Card>
        </Col>

        <Col span={24}>
          <Collapse accordion>
            <Panel header="Contact Support" key="3">
              <Paragraph>
                If you need further assistance, you can contact our support:
                <ul>
                  <li>Email us at support dhayalandeena0050@.com</li>
                  <li>Call us at +91 93441 54552</li>
                </ul>
              </Paragraph>
            </Panel>
            {/* <Panel header="Getting Started" key="1">
              <Paragraph>
                Learn how to get started with our application. Follow the steps
                below to begin:
                <ol>
                  <li>Sign up for an account.</li>
                  <li>Verify your email address.</li>
                  <li>Log in to access your dashboard.</li>
                  <li>Explore the features and start using the app.</li>
                </ol>
              </Paragraph>
            </Panel>
            <Panel header="Account Management" key="2">
              <Paragraph>
                Manage your account settings, update your profile information,
                and change your password:
                <ul>
                  <li>Go to your account settings from the dashboard.</li>
                  <li>Update your personal information.</li>
                  <li>
                    Change your password regularly to keep your account secure.
                  </li>
                  <li>Enable two-factor authentication for added security.</li>
                </ul>
              </Paragraph>
            </Panel> */}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}
