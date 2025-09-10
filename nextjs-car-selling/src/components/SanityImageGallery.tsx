"use client"

import dynamic from "next/dynamic"
import "react-image-gallery/styles/css/image-gallery.css"

// knihovna exportuje default komponentu
const ImageGallery = dynamic(() => import("react-image-gallery"), { ssr: false })

export type GalleryItem = {
  original: string
  thumbnail: string
  originalAlt?: string
  thumbnailAlt?: string
}

export function SanityImageGallery({
  items,
  className,
}: {
  items: GalleryItem[]
  className?: string
}) {
  if (!items?.length) return null
  return (
    <div className={className}>
      <ImageGallery
        items={items}
        lazyLoad
        infinite
        showPlayButton={false}
        showFullscreenButton
        showBullets={false}
        additionalClass="sanity-gallery"
        slideDuration={250}
      />
    </div>
  )
}
