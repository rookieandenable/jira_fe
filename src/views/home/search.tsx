import { Form, Input } from "antd";
import React from "react";
import BaseSelect from "@/components/baseSelect";

export default function Search() {

  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
        />
      </Form.Item>
      <Form.Item>
        <BaseSelect />
      </Form.Item>
    </Form>
  )
}