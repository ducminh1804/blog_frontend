import History from './History/History'

export default function HistoryList() {
  // console.log("check history render")
  return (
    <div>
      {Array.from({ length: 100 }).map((_, index) => (
        <History key={index}/>
      ))}
    </div>
  )
}
