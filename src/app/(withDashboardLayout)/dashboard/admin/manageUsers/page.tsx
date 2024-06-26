"use client";

import { toast } from "sonner";
import { Box, IconButton, Pagination, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetAllUserQuery } from "@/redux/api/userManagementApi";
import { useChangeUserStatusMutation } from "@/redux/api/userManagementApi";
import { useChangeUserRoleMutation } from "@/redux/api/userManagementApi";
import Skeleton from "@mui/material/Skeleton";

const USER_STATUS = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
};
const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const ManageUsers = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  query["page"] = page;
  query["limit"] = limit;
  const [users, setAllUsers] = useState<any>([]);
  const [changeUserStatus, { isLoading: statusLoading }] =
    useChangeUserStatusMutation({});
  const [changeUserRole, { isLoading: roleLoading }] =
    useChangeUserRoleMutation({});
  const { data, isLoading } = useGetAllUserQuery({});

  const meta = data?.meta;
  let pageCount: number;
  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }
  const handleStatusChange = async (id: string, currentStatus: string) => {
    //console.log({ id, currentStatus });
    const newStatus =
      currentStatus === USER_STATUS.ACTIVE
        ? USER_STATUS.BLOCKED
        : USER_STATUS.ACTIVE;

    const res = await changeUserStatus({ id: id, status: newStatus });
    //console.log(res);
  };

  const handleRoleChange = async (id: string, currentRole: string) => {
    const newRole =
      currentRole === USER_ROLE.ADMIN ? USER_ROLE.USER : USER_ROLE.ADMIN;
    //console.log({ newRole, currentRole });
    const res = await changeUserRole({ id: id, role: newRole });
    if (res?.data?.success) {
      toast.success("Change user Role successfully");
    }
    //console.log(res, "check the change user role response");
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //console.log(users, "the data");
  useEffect(() => {
    const updateData = data?.map((user: any, index: number) => {
      return {
        sl: index + 1,
        id: user?.id,
        username: user.username,
        email: user.email,
        status: user.status,
        role: user.role,
      };
    });
    setAllUsers(updateData);
  }, [data]);

  const columns: GridColDef[] = [
    { field: "sl", headerName: "Serial", flex: 1 },
    { field: "username", headerName: "User name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "status", headerName: "User Status", flex: 1 },
    { field: "role", headerName: "User Role", flex: 1 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }: { row: { id: string; status: string } }) => (
        <Button
          onClick={() => handleStatusChange(row.id, row.status)}
          sx={{ background: "orange" }}
        >
          {row.status === USER_STATUS.ACTIVE ? "Block User" : "Activate User"}
        </Button>
      ),
    },
    {
      field: "changeRole",
      headerName: "Change Role",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }: { row: { id: string; role: string } }) => (
        <Button
          onClick={() => handleRoleChange(row.id, row.role)}
          sx={{ background: "orange" }}
        >
          {row.role === USER_ROLE.USER ? "Create Admin" : "Create User"}
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box>
        {!isLoading ? (
          <Box my={2}>
            <DataGrid
              rows={users ?? []}
              columns={columns}
              hideFooterPagination
              slots={{
                footer: () => {
                  return (
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Pagination
                        color="primary"
                        count={pageCount}
                        page={page}
                        onChange={handleChange}
                      />
                    </Box>
                  );
                },
              }}
            />
          </Box>
        ) : (
          <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton animation="wave" height={40} />
            <Skeleton animation="wave" height={40} />
            <Skeleton animation={false} height={40} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ManageUsers;
