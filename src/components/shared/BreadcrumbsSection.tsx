"use client"

import { Typography, Breadcrumbs } from "@mui/material"
import Link from "next/link"
import React from "react"

export default function BreadcrumbsSection({
  breadCrumbsList = [],
}: {
  breadCrumbsList?: { label: string; path?: string }[]
}) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadCrumbsList?.map((item, index) => {
        if (item.path) {
          return (
            <Link color="inherit" key={index} href={item.path}>
              {item.label}
            </Link>
          )
        } else {
          return (
            <Typography color="text.primary" key={index}>
              {" "}
              {item.label}{" "}
            </Typography>
          )
        }
      })}
    </Breadcrumbs>
  )
}
