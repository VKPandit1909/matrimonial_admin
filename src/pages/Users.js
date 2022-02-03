import React, { Component } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Row,
  Col,
  Tag,
  message,
  Form,
  Select,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

class Users extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    udata: [],
    uaddress: "",
  };

  componentDidMount() {
    this.usersList();
  }

  usersList = (type) => {
    if (type == "update") {
      alert("Updated Successfully.");
    }
    fetch("http://localhost:3000/users-list", {
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
          // type: "all",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        var uarr = [];
        data.data.forEach((element) => {
          Object.keys(element).forEach(function (key) {
            if (key == "basic") {
              var newkey = "age";
              element[newkey] = element[key].age;
              delete element[key];
            }
          });
          uarr.push(element);
        });
        // console.log(uarr);
        this.setState({
          udata: uarr,
        });
        console.log(data, "datas");
      });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onFinish = (values) => {
    console.log(values);
    if (values.type == undefined) {
      message.warning("Please select any new type to update.");
    } else {
      this.updateType(values.id,values.type);
    }
  };

  updateType = (id, type) => {
    fetch("http://localhost:3000/update-user-type", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: id,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          message.success("Updated Successfully.");
          this.usersList("update");
        } else {
          message.error(data.error);
        }
      });
  };

  updateStatus = (id, status) => {
    fetch("http://localhost:3000/update-user-status", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: id,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          message.success("Updated Successfully.");
          this.usersList("update");
        } else {
          message.error(data.error);
        }
      });
  };

  render() {
    const types = [
      { label: "Free", value: "free" },
      { label: "Paid", value: "paid" },
      { label: "VIP", value: "vip" },
      { label: "VVIP", value: "vvip" },
    ];
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        // fixed: 'left',
        // width: "30%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        // width: "20%",
        ...this.getColumnSearchProps("age"),
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        sorter: (a, b) => a.gender.length - b.gender.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
        ...this.getColumnSearchProps("mobile"),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Caste",
        dataIndex: "caste",
        key: "caste",
        ...this.getColumnSearchProps("caste"),
      },
      {
        title: "User Type",
        dataIndex: "type",
        key: "type",
        // fixed: 'right',
        sorter: (a, b) => a.gender.length - b.gender.length,
        sortDirections: ["descend", "ascend"],
        render: (type) => (
          <Tag color={type === "free" ? "geekblue" : "green"} key={type}>
            {type.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Action 1",
        key: "action1",
        render: (text, record) => (
          <Space size="middle">
            <Button
              onClick={() =>
                this.updateStatus(record._id, record.status == "0" ? "1" : "0")
              }
              style={{
                borderColor: record.status == "0" ? "#1890ff" : "#faad14",
                color: record.status == "0" ? "#1890ff" : "#faad14",
              }}
            >
              {record.status == "0" ? "Verify" : "Unverify"}
            </Button>
          </Space>
        ),
      },
      {
        title: "Action 2",
        key: "action2",
        render: (text, record) => (
          <Space size="middle">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              // onFinishFailed={onFinishFailed}
              initialValues={{
                ["type"]: record.type,
                ["id"]: record._id
              }}
            >
              <Form.Item name="type" style={{marginBottom: 10}}>
                <Select defaultValue={record.type}>
                  {types.map(({ label, value }) => {
                    return <Select.Option value={value}>{label}</Select.Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item name="id" hidden>
                  <Input value={record._id} defaultValue={record._id} />
              </Form.Item>
              <Form.Item style={{marginBottom: 0}}>
                <Button type="primary" htmlType="submit">
                  {/* {record.type == "paid" ? "Downgrade to Free" : "Upgrade to Paid"} */}
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Space>
        ),
      },
    ];

    return (
      <Row>
        <Col xs={24}>
          <h1 style={{ marginBottom: 20 }}>All Users</h1>
        </Col>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={this.state.udata}
            rowKey={this.state.udata._id}
            key={this.state.udata._id}
            // scroll={{ x: 1500 }}
          />
        </Col>
      </Row>
    );
  }
}

export default Users;
