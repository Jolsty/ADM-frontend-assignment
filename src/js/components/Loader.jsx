import PropTypes from 'prop-types'
import { CgSpinner } from 'react-icons/cg'
import classNames from 'classnames'

const Loader = ({ loading, className }) => {
  if (!loading) {
    return null
  }

  return <CgSpinner className={classNames('animate-spin', className)} size={32} />
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string
}

Loader.defaultProps = {
  className: ''
}

export default Loader
