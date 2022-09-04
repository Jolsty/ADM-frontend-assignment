import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import { useEffect, useRef } from 'react'
import { GoSearch } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { setFilteredData, setSearchValue } from '../../redux/reducers/app'
import { selectApp } from '../../redux/selectors/app'

// There are other, better, solutions such as Twitter's typeahead but this is custom-made.

const debouncedWait = 300

const SearchInput = () => {
  const dispatch = useDispatch()
  const { data, searchValue } = useSelector((state) => selectApp(state))

  const inputRef = useRef(null)

  const debouncedSearchRef = useRef(
    debounce(async ({ data, value }) => {
      if (!value) {
        dispatch(setFilteredData(null))
        return
      }
      const regExp = new RegExp(`${value}`, 'gi')
      const filteredData = data.filter(({ name }) => regExp.test(name))
      dispatch(setFilteredData(filteredData))
    }, debouncedWait)
  )

  useEffect(() => {
    // if new data comes or the searchValue changes, update the filtered data
    debouncedSearchRef.current({ data, value: searchValue })
  }, [data, searchValue])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => debouncedSearchRef.current.cancel() // clean up the debounced function once this component is unmounted (it will never happen in this app, but still...)
  }, [debouncedSearchRef])

  const handleChange = async ({ target: { value } }) => dispatch(setSearchValue(value))

  return (
    <div className="flex flex-col w-full items-center max-w-[450px] px-4 sm:px-8">
      <div className="group relative w-full flex flex-row justify-center items-center">
        <label htmlFor="search" className="absolute z-[1] left-0 pl-4">
          <span className="sr-only">Search</span>
          <GoSearch className="cursor-text" />
        </label>
        <input
          ref={inputRef}
          type="search"
          id="search"
          autoFocus
          autoComplete="off"
          placeholder="Filter by name..."
          className="outline-offset-0 outline-indigo-500 p-4 pl-12 w-full rounded-lg drop-shadow group-hover:drop-shadow-xl font-semibold text-sm cursor-text"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

SearchInput.propTypes = {}

export default SearchInput
