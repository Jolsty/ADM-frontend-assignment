import SearchInput from './SearchInput'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { init } from '../../redux/reducers/app'
import '../../styles/index.css'
import PlanetPopup from './Planet/PlanetPopup'
import Table from './Table/Table'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(init())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <div className="w-full max-w-[1280px] flex flex-col justify-start items-center mt-8 h-full">
        <SearchInput />
        <Table />
      </div>
      <PlanetPopup />
    </div>
  )
}

export default App
