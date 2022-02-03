import { Form, Input, Button, Checkbox, Card, message, Row, Col } from "antd";
import "../App.css";
import favicon from "../assets/favicon.png";

const ChangeAddress = () => {

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    fetch("http://localhost:3000/set-address", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        fields: {
          address: values.address,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        message.success("Data Saved Successfully.");
        form.resetFields();
        console.log(data, "data");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col xs={12}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please input your new address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={12}></Col>
    </Row>
  );
};

export default ChangeAddress;
