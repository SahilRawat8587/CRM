import React from 'react';
import { Button, Table, Select, Modal, Input } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Employee() {
  const navigate = useNavigate();

  // State Variables
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [tableData, setTableData] = React.useState([
    {
      key: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'Manager',
      status: 'Active',
      joiningDate: '2023-06-15',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      role: 'Employee',
      status: 'Inactive',
      joiningDate: '2024-01-12',
    },
    {
      key: '3',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '456-789-1234',
      role: 'HR',
      status: 'Active',
      joiningDate: '2023-11-20',
    },
  ]);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [prev, setPrev] = React.useState(null);
  const [next, setNext] = React.useState(null);

  // Search & Input Handlers
  const onSearch = (value) => console.log('Search:', value);
  const handleInputChange = (e) => setQuery(e.target.value);
  const handlePageChange = (page) => console.log('Page Changed:', page);

  // Delete Confirmation Handlers
  const handleDeleteConfirm = () => {
    console.log('Manager Deleted:', userDetails);
    setDeleteModal(false);
  };
  const handleDeleteCancel = () => setDeleteModal(false);

  // Table Columns
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Joining Date', dataIndex: 'joiningDate' },
  ];

  return (
    <div className="min-h-screen flex-col bg-white flex items-center justify-center py-10">
      {/* Main Container */}
      <div className="bg-white shadow-md rounded-lg w-full h-[800px]">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg font-bold">Employee Management</h5>
          <div className="flex items-center gap-3">
            <Input.Search
              placeholder="Search Employee" 
              onSearch={onSearch}
              onChange={handleInputChange}
              allowClear
              value={query}
              style={{ maxWidth: '350px' }}
            />
            <Button
              type="primary"
              onClick={() => navigate('/dashboard/employee/add')}
            >
              Add Employee
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex justify-between px-4 py-3 items-center bg-gray-100">
          <Select
            defaultValue="Sort By"
            style={{ width: 120 }}
            options={[
              { value: 'By Name', label: 'By Name' },
              { value: 'By Date', label: 'By Date' },
            ]}
          />
          <div className="flex items-center gap-3">
            <Select
              defaultValue="Active"
              style={{ width: 120 }}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
            <Select
              defaultValue="Manager"
              style={{ width: 120 }}
              options={[
                { value: 'Manager', label: 'Manager' },
                { value: 'Employee', label: 'Employee' },
                { value: 'HR', label: 'HR' },
              ]}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="p-4">
          <Table
            pagination={false}
            columns={loading ? [] : columns}
            dataSource={tableData}
            bordered
          />
          {/* Pagination Buttons */}
          <div className="flex justify-end items-center mt-4 gap-2">
            <Button
              disabled={!prev}
              onClick={() => handlePageChange(prev)}
              icon={<LeftOutlined />}
            >
              Prev
            </Button>
            <Button
              disabled={!next}
              type="primary"
              onClick={() => handlePageChange(next)}
              icon={<RightOutlined />}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Plan Modal */}
      {open && (
        <PlanModal userId={userId} open={open} setOpen={setOpen} />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <span style={{ color: 'red' }}>
            <ExclamationCircleFilled className="mr-2" />
            Delete Manager
          </span>
        }
        open={deleteModal}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: 'red',
            borderColor: 'red',
            color: 'white',
          },
        }}
      >
        <p className="text-danger">
          Are you sure you want to delete this manager?
        </p>
        {userDetails?.name && (
          <>
            <p>
              <strong className="text-danger">Manager Name: </strong>
              {userDetails.name}
            </p>
            <p>
              <strong className="text-danger">Manager Email: </strong>
              {userDetails.email}
            </p>
            <p>
              <strong className="text-danger">Phone Number: </strong>
              {userDetails.phone}
            </p>
            <p>
              <strong className="text-danger">Role: </strong>
              {userDetails.role}
            </p>
            <p>
              <strong className="text-danger">Status: </strong>
              {userDetails.status}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

// Plan Modal Component
const PlanModal = ({ userId, open, setOpen }) => {
  return (
    <Modal
      title="Manager Plan Details"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <p>Manager ID: {userId || 'N/A'}</p>
      <p>Plan Details will be shown here...</p>
    </Modal>
  );
};

export default Employee;
