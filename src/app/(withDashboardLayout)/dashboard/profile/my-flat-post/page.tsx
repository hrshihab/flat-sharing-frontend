"use client";

import { Box, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useFlatDeleteMutation,
  useGetFlatPostByUserIdQuery,
  useGetFlatPostsQuery,
} from "@/redux/api/flatApi";
import Link from "next/link";
import { toast } from "sonner";
import FlatEditModal from "../../admin/flatManage/components/flatUpdates";
import { useGetFlatBookingsByUserIdQuery } from "@/redux/api/flatRequest";

const MyFlatPost = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState(null);

  query["page"] = page;
  query["limit"] = limit;
  const [flats, setAllFlats] = useState<any>([]);
  const { data, isLoading } = useGetFlatPostByUserIdQuery({});
  //console.log("data", data);
  const [flatDelete] = useFlatDeleteMutation();

  const meta = data;
  //console.log("meta", meta[0].user.username);
  let pageCount: number;
  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const updateData = data?.map((flat: any, index: number) => {
      return {
        sl: index + 1,
        id: flat?.id,
        location: flat.location,
        rentAmount: flat.rentAmount,
        bedrooms: flat.bedrooms,
        amenities: Array.isArray(flat.amenities)
          ? flat.amenities.join(", ")
          : "",
        description: flat.description,
        bookingCount: flat.booking?.length || 0,
        username: flat?.user?.username,
      };
    });
    setAllFlats(updateData);
  }, [data]);

  const handleEdit = (id: string) => {
    const selectedFlatData = meta?.find((flat: any) => flat.id === id);
    if (selectedFlatData) {
      setSelectedFlat(selectedFlatData);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this flat permanently? This will also delete all associated bookings."
    );
    if (!confirmed) {
      return;
    }

    try {
      const res = await flatDelete(id).unwrap();
      if (res?.id) {
        toast.success("Flat deleted successfully");
      } else {
        toast.error("Failed to delete flat");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the flat");
    }
  };

  const columns: GridColDef[] = [
    { field: "sl", headerName: "Serial", flex: 0.5 },
    { field: "location", headerName: "Location", flex: 1.5 },
    { field: "rentAmount", headerName: "Rent Amount", flex: 1 },
    { field: "bedrooms", headerName: "Bedrooms", flex: 1 },
    { field: "amenities", headerName: "Amenities", flex: 2 },
    { field: "bookingCount", headerName: "Bookings", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "username", headerName: "Creator", flex: 1 },
    {
      field: "details",
      headerName: "Details",
      flex: 1.5,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "#fff" }}
          href={`/flatDetails/${row.id}`}
          component={Link}
        >
          Details
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1.5,
      renderCell: ({ row }) => (
        <Button
          onClick={() => handleEdit(row.id)}
          variant="outlined"
          color="primary"
          endIcon={<EditIcon />}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1.5,
      renderCell: ({ row }) => (
        <Button
          onClick={() => handleDelete(row.id)}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
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
              rows={flats ?? []}
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
          <h1>Loading.....</h1>
        )}
      </Box>
      {selectedFlat && (
        <FlatEditModal
          flat={selectedFlat}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
      )}
    </Box>
  );
};

export default MyFlatPost;
