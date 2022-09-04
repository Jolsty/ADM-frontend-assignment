import PropTypes from 'prop-types'
import { formatDate } from '../../helpers/date.helper'
import Planet from '../Planet/Planet'

const TableRow = ({ name, height, mass, created, edited, homeworld }) => {
  return (
    <tr
      className="border-b-gray-300 border-b font-medium text-xs bg-white even:bg-indigo-100 hover:text-sky-700 hover:font-bold focus:text-sky-700 focus:font-bold outline-none w-full"
      tabIndex={0}
    >
      <td
        className="sticky left-0 z-10 py-2 px-4 sm:py-3 sm:px-5 bg-inherit text-sm ellipsis text-left"
        title={name}
      >
        {name}
      </td>
      <td className="py-2 px-4 sm:py-3 sm:px-5 text-center">{height}</td>
      <td className="py-2 px-4 sm:py-3 sm:px-5 text-center">{mass}</td>
      <td className="py-2 px-4 sm:py-3 sm:px-5 text-center">{formatDate(created)}</td>
      <td className="py-2 px-4 sm:py-3 sm:px-5 text-center">{formatDate(edited)}</td>
      <td className="py-2 px-4 sm:py-3 sm:px-5 text-center">
        <Planet planet={homeworld} person={name} />
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  mass: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  edited: PropTypes.string.isRequired,
  homeworld: PropTypes.string.isRequired
}

export default TableRow
