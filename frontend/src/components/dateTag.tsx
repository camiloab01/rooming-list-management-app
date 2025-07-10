interface DateTagProps {
  cutOffDate: string
}

export default function DateTag(props: DateTagProps) {
  const { cutOffDate } = props

  return (
    <div className="absolute top-4 right-4 text-blue-700 rounded items-center flex flex-col">
      <div className="font-semibold text-xs bg-[#3E8CFF40] px-2 rounded-tl-lg rounded-tr-lg text-center w-14">
        {new Date(cutOffDate)
          .toLocaleString('default', {
            month: 'short',
          })
          .toLocaleUpperCase()}
      </div>
      <div className="font-bold text-2xl px-2 bg-blue-50 text-blue-700 rounded-bl-lg rounded-br-lg text-center w-14">
        {new Date(cutOffDate).toLocaleString('default', {
          day: 'numeric',
        })}
      </div>
      <div className="text-xs text-gray-500 mt-1">Cut-Off Date</div>
    </div>
  )
}
