"use client"

import React from "react"
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"
import TablePagination from "@mui/material/TablePagination"

//
export default function AlbumsTableList({
  searchParams = {},
  rows = null,
}: {
  searchParams: any
  rows: any
}) {
  const handleView = (id: any) => {
    // Handle view action here
    console.log(`View action clicked for ID: ${id}`)
  }

  const handleEdit = (id: any) => {
    // Handle edit action here
    console.log(`Edit action clicked for ID: ${id}`)
  }

  const handleDelete = (id: any) => {
    // Handle delete action here
    console.log(`Delete action clicked for ID: ${id}`)
  }

  const formatReleaseYear = (dateString: string | number | Date) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options as any
    )
    return formattedDate
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 350 },
    {
      field: "release_year",
      headerName: "Release Year",
      width: 220,
      valueGetter: (params) => formatReleaseYear(params.value),
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 180,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div onClick={(e) => e.stopPropagation()}>
          {/* View Icon */}
          <IconButton onClick={() => handleView(params.row.id)}>
            <RemoveRedEyeIcon color="info" className="text-slate-600 text-xl" />
          </IconButton>

          {/* Edit Icon */}
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon color="primary" className="text-xl" />
          </IconButton>
          {/* Delete Icon */}
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteForeverIcon color="error" className="text-xl" />
          </IconButton>
        </div>
      ),
    },
  ]
  const [page, setPage] = React.useState(
    searchParams?.page ? Number(searchParams?.page) : 0
  )

  const [rowsPerPage, setRowsPerPage] = React.useState(
    Number(searchParams?.perPage || 25)
  )
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }
  return (
    <div style={{ maxHeight: 700, width: "100%" }}>
      <DataGrid
        className="max-h-[700px] overflow-y-auto"
        rows={rows}
        columns={columns}
        checkboxSelection
        hideFooterPagination={true}
      />
      {rows !== null && (
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[25, 50, 100, 150, 200]}
        />
      )}
    </div>
  )
}
