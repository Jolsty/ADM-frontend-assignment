const TableHead = () => {
  return (
    <thead>
      <tr className="bg-indigo-700 text-xs sm:text-sm text-white sticky top-0 z-20">
        <th className="py-2 px-4 sm:py-3 sm:px-5 font-medium w-[20%] sm:w-[30%] text-left sticky left-0 bg-inherit z-10">
          Name
        </th>
        <th className="py-2 px-4 sm:py-3 sm:px-5 font-medium ">Height</th>
        <th className="py-2 px-4 sm:py-3 sm:px-5 font-medium ">Mass</th>
        <th className="py-2 px-4 sm:py-3 sm:px-5 font-medium ">Created</th>
        <th className="py-2 px-4 sm:py-3 sm:px-5 font-medium ">Edited</th>
        <th className="py-2 px-4 sm:py-3 sm:px-5 font-medium ">Planet</th>
      </tr>
    </thead>
  )
}

TableHead.propTypes = {}

export default TableHead
