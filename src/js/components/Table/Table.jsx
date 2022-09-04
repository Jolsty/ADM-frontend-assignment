import isEmpty from 'lodash.isempty'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectApp } from '../../../redux/selectors/app'
import { fetchPeople } from '../../../redux/thunks/app'
import Loader from '../Loader'
import TableHead from './TableHead'
import TableRow from './TableRow'

const Table = () => {
  const dispatch = useDispatch()
  const { next, error, loading, data, filteredData, searchValue } = useSelector((state) =>
    selectApp(state)
  )
  const [tableParentHeight, setTableParentHeight] = useState(0)

  const tableParentRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      let contentHeight = window.innerHeight

      if (tableParentRef.current) {
        contentHeight = contentHeight - tableParentRef.current.getBoundingClientRect().top - 84
      }

      setTableParentHeight(contentHeight)
    }

    handleResize() // first render

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [tableParentRef])

  const loadMore = () => {
    if (!next) {
      return
    }

    dispatch(fetchPeople({ url: next }))
  }

  const dataToShow = searchValue && filteredData !== null ? filteredData : data
  const hasData = !isEmpty(dataToShow)

  if (loading && !hasData) {
    // initial page load
    return <Loader loading={loading} className="mt-8" />
  }

  return (
    <div className="w-[100vw] px-4 sm:px-8 md:px-12 flex flex-col items-center justify-start mt-8 pt-8 border-t-2 border-gray-300">
      <div
        className="w-full overflow-auto max-w-[1280px] flex flex-col items-center justify-start mb-8"
        ref={tableParentRef}
        id="pota"
        style={{ height: `${tableParentHeight}px` }}
      >
        {hasData ? (
          <table className="w-full min-w-[650px] drop-shadow-lg bg-white text-sm table-fixed">
            <TableHead />
            <tbody>
              {dataToShow.map((person) => (
                <TableRow key={person.name} {...person} />
              ))}
            </tbody>
          </table>
        ) : (
          <span>No results</span>
        )}
      </div>
      <Loader loading={loading} />
      {error && (
        <span className="text-sm text-red-400 font-semibold inline-block mb-4">{error}</span>
      )}
      {next && !loading && (
        <button
          onClick={loadMore}
          className="bg-indigo-500/75 hover:bg-indigo-500/100 transition-colors py-1.5 px-3 font-medium drop-shadow text-sm rounded-lg text-white"
        >
          Load more
        </button>
      )}
    </div>
  )
}

Table.propTypes = {}

export default Table
