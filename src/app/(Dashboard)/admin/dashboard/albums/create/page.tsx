"use client"

import BreadcrumbsSection from "@/components/shared/BreadcrumbsSection"
import React, { useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

import dayjs, { Dayjs } from "dayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Button } from "@mui/material"
import axios from "axios"

export default function AlbumsCreatePage() {
  const breadCrumbsList: any = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      label: "Albums List",
      path: "/admin/dashboard/albums",
    },
    {
      label: "Create",
    },
  ]

  const [data, setData] = useState({
    title: "",
    release_year: `${new Date().toISOString().split("T")[0]}`,
    genre: "",
  })

  const [error, setError] = useState({
    title: {
      error: false,
      helperText: "Title is required*",
    },
    release_year: {
      error: false,
      helperText: "Release year is required*",
    },
    genre: {
      error: false,
      helperText: "Genre is required*",
    },
  })
  const formatDate = (date: any) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }
  function handleSubmit() {
    let newError: any = {
      title: {
        error: data.title === "" ? true : false,
        helperText: data.title === "" ? "Title is required*" : "",
      },
      release_date: {
        error: data.release_year === "" ? true : false,
        helperText: data.release_year === "" ? "Release year is required*" : "",
      },
      genre: {
        error: data.genre === "" ? true : false,
        helperText: data.genre === "" ? "Genre is required*" : "",
      },
    }
    setError(newError)
    console.log(data)
    if (
      newError.genre.error ||
      newError.release_date.error ||
      newError.title.error
    )
      return false

    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_SERVER + "/album", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1laGFkaTFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDU1NzQ4NTEsImV4cCI6MTcwNjAwNjg1MX0.b8n6c23nr3hP-c5nQA0BO00jRHm_S06-bOitxunieis`,
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className="px-5">
      <div className="max-w-screen-xl mx-auto py-10">
        <div className="flex justify-between items-center gap-8 flex-wrap">
          <BreadcrumbsSection breadCrumbsList={breadCrumbsList} />
        </div>

        {/* form */}
        <section className="py-14">
          <Box
            component="form"
            className="border-2 border-gray-700 shadow rounded p-5 w-full max-w-[700px] grid gap-2"
            noValidate
            autoComplete="off"
          >
            <div>
              <h2 className="text-3xl text-blue-600 ml-1 mb-5">Create Album</h2>
            </div>
            <div className="grid gap-4">
              <TextField
                className="w-full"
                error={error.title.error}
                label="Enter Album Title"
                id="outlined-size-small"
                defaultValue={data.title}
                size="small"
                helperText={error.title.error && error.title.helperText}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value })
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="w-full"
                    label="Release Date"
                    defaultValue={dayjs(data.release_year)}
                    onChange={(newValue: any) => {
                      setData({ ...data, release_year: formatDate(newValue) })
                    }}
                    format="YYYY-MM-DD"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                className="w-full"
                error={error.genre.error}
                label="Enter Album Genre"
                id="outlined-size-small"
                defaultValue={data.genre}
                size="small"
                helperText={error.genre.error && error.genre.helperText}
                onChange={(e) => {
                  setData({ ...data, genre: e.target.value })
                }}
              />
            </div>
            <Button
              className="mt-4"
              onClick={() => {
                handleSubmit()
              }}
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </section>
      </div>
    </section>
  )
}
