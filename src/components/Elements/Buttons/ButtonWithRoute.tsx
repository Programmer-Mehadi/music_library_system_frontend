"use client"

import { Button } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

export default function ButtonWithRoute(props: any) {
  const router = useRouter()
  const { text = "", route = "/" } = props

  const handleOnCLick = () => {
    console.log("route", props.route)
    router.push(props.route)
  }
  return (
    <Button onClick={handleOnCLick} variant="contained" className="font-bold">
      {text}
    </Button>
  )
}
