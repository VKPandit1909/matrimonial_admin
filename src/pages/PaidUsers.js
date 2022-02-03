import React, { Component } from "react";
import { Table, Input, Button, Space, Row, Col } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

class PaidUsers extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    upaiddata: [],
  };

  componentDidMount() {
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
          type: "paid",
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
          upaiddata: uarr,
        });
        console.log(data, "datas");
      });
  }

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

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
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
        sorter: (a, b) => a.gender.length - b.gender.length,
        sortDirections: ["descend", "ascend"],
      },
    ];
    return (
      <Row>
        <Col xs={24}>
          <h1 style={{ marginBottom: 20 }}>Paid Users</h1>
        </Col>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={this.state.upaiddata}
            rowKey={this.state.upaiddata._id}
            key={this.state.upaiddata._id}
          />
        </Col>
      </Row>
    );
  }
}

export default PaidUsers;
