import PropTypes from 'prop-types'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlanet } from '../../../redux/selectors/popup'
import { fetchPlanet } from '../../../redux/thunks/popup'
import Loader from '../Loader'
import isEmpty from 'lodash.isempty'

const PlanetData = ({ planet, person }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPlanet({ url: planet }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planet])

  const handleTryAgain = () => dispatch(fetchPlanet({ url: planet }))

  const { loading, error, data } = useSelector((state) => selectPlanet(state))

  const unknownPlanet = data?.name === 'unknown'

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {loading && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Loader loading={loading} />
        </div>
      )}
      {error && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          {error && (
            <span className="text-sm text-red-400 font-semibold inline-block mb-8">{error}</span>
          )}
          <button
            onClick={handleTryAgain}
            className="bg-indigo-500/75 hover:bg-indigo-500/100 transition-colors py-1.5 px-3 font-medium drop-shadow text-sm rounded-lg text-white "
          >
            Try again
          </button>
        </div>
      )}
      {!isEmpty(data) &&
        (unknownPlanet ? (
          <p>This planet is unknown.</p>
        ) : (
          <Fragment>
            <p className="text-lg mb-4">
              Welcome to <strong>{data?.name}</strong>
            </p>
            <p>
              <strong>{person}</strong> is just one of the <strong>{data?.population}</strong>{' '}
              people living on <strong>{data?.name}</strong>.
            </p>
            <p>
              <strong>{data?.name}</strong> has a diameter of <strong>{data?.diameter}</strong>{' '}
              kilometers and its climate is <strong>{data?.climate}</strong>.
            </p>
          </Fragment>
        ))}
    </div>
  )
}

PlanetData.propTypes = {
  planet: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired
}

export default PlanetData
