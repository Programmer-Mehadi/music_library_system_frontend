import AlbumsTableList from "@/app/(Dashboard)/admin/dashboard/albums/_table/AlbumsTableList"
import ButtonWithRoute from "@/components/Elements/Buttons/ButtonWithRoute"
import BreadcrumbsSection from "@/components/shared/BreadcrumbsSection"

import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Albums - Music Library System",
  description: "Albums page",
}

const getAlbumsData = async (searchParams: any) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_SERVER + `/album`, {
    next: { revalidate: 0.5 },
  })

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch product data")
  }
  const response = await res.json()

  return response
}

export default async function AlbumsDashboadPage({
  searchParams,
}: {
  searchParams: any
}) {
  // breadcrumbs
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
      label: "Albums",
    },
  ]

  const albumsData = await getAlbumsData(searchParams)

  return (
    <section className="max-w-screen-xl mx-auto py-10">
      <div className="flex justify-between items-center gap-8 flex-wrap">
        <BreadcrumbsSection breadCrumbsList={breadCrumbsList} />
        <ButtonWithRoute
          text="Add Album"
          route="/admin/dashboard/albums/create"
        />
      </div>

      {/* table */}

      <section className="py-14">
        <AlbumsTableList searchParams={searchParams} rows={albumsData.data} />
      </section>
    </section>
  )
}
