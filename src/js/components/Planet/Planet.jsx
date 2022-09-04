import { IoMdPlanet } from 'react-icons/io'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { showPopup } from '../../../redux/reducers/popup'

const Planet = ({ planet, person }) => {
  const dispatch = useDispatch()

  if (!planet) {
    return null
  }

  const handlePlanetClick = () =>
    dispatch(
      showPopup({
        props: { planet, person }
      })
    )

  return (
    <div
      className="flex flex-col items-center relative w-full"
      onClick={handlePlanetClick}
      role="button"
    >
      <IoMdPlanet size={24} className="cursor-pointer outline-none" />
    </div>
  )
}

Planet.propTypes = {
  planet: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired
}

export default Planet
