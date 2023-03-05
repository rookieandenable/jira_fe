import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Rate, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import api from '@/api';
import { ProjectListType } from '@/types/http'
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { getProjects, homeState } from '@/store/home';
import BaseSelect from '@/components/baseSelect';
import { Link } from 'react-router-dom';

const List: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(homeState)
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sel, setSel] = useState(6)

  const showModal = (item) => {
    setIsModalOpen(true);
    form.setFieldValue('name', item.name)
    form.setFieldValue('personId', item.personId)
    form.setFieldValue('organization', item.organization)
    form.setFieldValue('id', item.id)
    setSel(item.personId)
  };

  const submit = async (value) => {
    if (!value.personId) {
      value.personId = 5
    }
    const res = await api.modifyProjectItem(value)
    setIsModalOpen(false)
    if (res.code === 200) {
      dispatch(getProjects())
      messageApi.open({
        type: 'success',
        content: res.msg
      })
      return
    }
    messageApi.open({
      type: 'error',
      content: res.msg
    })
  }
  const setVal = (value) => {
    form.setFieldValue('personId', value)
  }

  useEffect(() => {
    dispatch(getProjects())
  }, [])

  const delItem = async (id) => {
    const params = { id }
    const res = await api.deleteProjectItem(params)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: res.msg
      })
      dispatch(getProjects())
    }
  }
  
  const columns: ColumnsType<ProjectListType> = [
    {
      title: <Rate count={1} value={1} disabled={true} />,
      key: 'collection',
      render: (_, record) => {
        return (
          <Space size={'middle'}>
            <Rate 
              count={1} 
              value={record.enshrine ? 1 : 0}
              onChange = {
                async (value) => {
                  const params = {
                    id: record.id,
                    shrine: value ? true : false,
                  }
                  await api.modifyShrine(params)
                  dispatch(getProjects())
                }
              }
            />
          </Space>
        )
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <Link to={ `/home/${record.id}` }>{ record.name }</Link>,
    },
    {
      title: '部门',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: '负责人',
      dataIndex: 'personId',
      key: 'personId',
      render: (value) => {
        const res = state.membersList.filter(item => item.id === value)
        return <span>{res[0]?.name}</span>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='link' onClick={() => showModal(record)}>编辑</Button>
          <Button type='link' onClick={() => delItem(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];


  return (
    <>
      { contextHolder }
      <Table columns={columns} dataSource={state.projectsList} />
      <Modal title="编辑项目"
        maskClosable={false} 
        open={isModalOpen} 
        onOk={() => setIsModalOpen(false)} 
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={submit}
          form={form}
        >
          <Form.Item 
            label='名称' 
            name='name'
            rules={[{ required: true, message: 'please input name' }]}
          >
            <Input placeholder="please input name" />
          </Form.Item>
          <Form.Item 
            label='部门'
            name='organization'
            rules={[{ required: true, message: 'please input depend' }]}
          >
            <Input placeholder="please input depend" />
          </Form.Item>
          <Form.Item label='负责人' name='personId' >
            <BaseSelect setVal={setVal} selVal={sel} />
          </Form.Item>
          <Form.Item name='id'>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default List;