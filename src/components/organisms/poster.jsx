import PosterDefault from '../molecules/poster-default'
import PosterHover from '../molecules/poster-hover'
import { useState, useRef } from 'react'

function Poster({
  movie,
  galleryType,
  //isMobile=false,
  xBoundary,
  onClick,
  isInMyListHandler,
}) {
  //const { isOpen } = usePopupDetail
  const [isHovered, setIsHovered] = useState(false)
  const posterRef = useRef(null)

  const isContinueType = galleryType !== 'continue'

  // Fungsi untuk menentukan posisi hover
  const getHoverPosition = () => {
    if (!posterRef.current) return {}
    
    const rect = posterRef.current.getBoundingClientRect()
    // const viewportWidth = window.innerWidth
    const rectWidth = rect.width
    const hoverWidth = 408 //TODO: sementara pakai maks w
    const difWidth = (hoverWidth - rectWidth) / 2
    
    // Pemeriksaan sisi kiri
    if (rect.left - difWidth < xBoundary.left) {
      // tidak perlu (xBoundary.left - rect.left)
      // biar tidak terlalu nutup card setelahnya
      const offset = 0
      return { left: `${offset}px`, transform: 'translateX(0) translateY(-50%)' }
    }
    // Pemeriksaan sisi kanan
    else if (rect.right + difWidth > xBoundary.right) {
      const offset = (rect.right - xBoundary.right)
       return { right: `${offset}px`, transform: 'translateX(0) translateY(-50%)' }
    }
    
    // default: di tengah
    return { left: '50%', transform: 'translateX(-50%) translateY(-50%)' }
  }
  
  return (
    <div
      className="relative overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={posterRef}
    >
      <PosterDefault
        movie={ movie }
        galleryType={ galleryType }
        className={ isContinueType ? 'cursor-pointer' : '' }
      />

      { //(!isMobile && isHovered && galleryType !== 'continue') &&
        (isHovered && isContinueType) &&
        <div
          className="absolute z-30 top-1/2"
          style={getHoverPosition()}
        >
          <PosterHover movie={movie} onClick={onClick} isInMyListHandler={isInMyListHandler}/>
        </div>
        }
    </div>
  )
}

export default Poster