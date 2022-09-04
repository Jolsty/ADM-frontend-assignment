import { useOutsideAlerter } from '../../helpers/hooks.helper'
import { useRef, useEffect } from 'react'
import { selectPopup } from '../../../redux/selectors/popup'
import { useSelector, useDispatch } from 'react-redux'
import { hidePopup } from '../../../redux/reducers/popup'
import PlanetData from './PlanetData'

const PlanetPopup = () => {
  const dispatch = useDispatch()
  const { show, props: popupProps } = useSelector((state) => selectPopup(state))
  const popupRef = useRef(null)

  const handleHidePopup = () => dispatch(hidePopup())

  useOutsideAlerter(popupRef, handleHidePopup)

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [show])

  useEffect(() => {
    const handleKeyDown = ({ code }) => {
      if (show && code === 'Escape') {
        handleHidePopup()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  if (!show) {
    return null
  }

  return (
    <div className="h-[100vh] absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden backdrop-blur-md backdrop-opacity-90">
      <div
        ref={popupRef}
        className="flex flex-col bg-white w-full md:max-w-[30rem] min-h-[10rem] px-6 py-4 sm:px-12 sm:py-8 drop-shadow-lg relative z-20"
      >
        <PlanetData {...popupProps} />
      </div>
    </div>
  )
}

PlanetPopup.propTypes = {}

export default PlanetPopup
