"use client";

import { toast } from "sonner";
import { Box, Pagination, Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useGetBookingByFlatIdQuery,
  useGetFlatBookingsByUserIdQuery,
  useUpdateFlatRequestStatusMutation,
} from "@/redux/api/flatRequest";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

const BOOKING_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const RejectBooking = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: flatRequestData, isLoading } = useGetBookingByFlatIdQuery({});
  const [updateFlatRequestStatus] = useUpdateFlatRequestStatusMutation();
  const [pendingFlats, setPendingFlats] = useState<any>([]);

  query["page"] = page;
  query["limit"] = limit;

  let pageCount: number;
  if (flatRequestData?.meta?.total) {
    pageCount = Math.ceil(flatRequestData.meta.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (flatRequestData) {
      const updateData = flatRequestData
        .filter((flat: any) => flat.status === BOOKING_STATUS.REJECTED)
        .map((flat: any, index: number) => ({
          sl: index + 1,
          id: flat.id,
          userId: flat.userId,
          flatId: flat.flatId,
          name: flat.name,
          age: flat.age,
          profession: flat.profession,
          PresentAddress: flat.PresentAddress,
          maritalStatus: flat.maritalStatus,
          phoneNo: flat.phoneNo,
          status: flat.status,
        }));
      setPendingFlats(updateData);
    }
  }, [flatRequestData]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      //console.log("id", id);
      //console.log("status", status);
      const res = await updateFlatRequestStatus({ id, status });
      //console.log("res", res);
      if (res?.data?.id) {
        toast.success(`Booking ${res.data.status} successfully`);
        // Optionally refresh data here
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  };

  const columns: GridColDef[] = [
    { field: "sl", headerName: "Serial", flex: 0.5 },
    { field: "flatId", headerName: "Flat ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 0.5 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "phoneNo", headerName: "Phone", flex: 1 },
    { field: "profession", headerName: "Profession", flex: 1.5 },
    { field: "maritalStatus", headerName: "Marital Status", flex: 1 },
    { field: "PresentAddress", headerName: "Address", flex: 1.5 },
    {
      field: "pending",
      headerName: "Pending",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }: { row: { id: string } }) => (
        <Button
          onClick={() => handleStatusChange(row.id, BOOKING_STATUS.PENDING)}
          //sx={{ background: "primary" }}
          variant="outlined"
          endIcon={<PublishedWithChangesIcon />}
        >
          Pending
        </Button>
      ),
    },
    {
      field: "approve",
      headerName: "Approved",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }: { row: { id: string } }) => (
        <Button
          onClick={() => handleStatusChange(row.id, BOOKING_STATUS.APPROVED)}
          //sx={{ background: "orange" }}
          color="success"
          variant="outlined"
          endIcon={<CheckCircleOutlinedIcon />}
        >
          Approve
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
              rows={pendingFlats ?? []}
              columns={columns}
              hideFooterPagination
              slots={{
                footer: () => (
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
                ),
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

export default RejectBooking;
