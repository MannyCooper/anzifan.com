import useSWR from 'swr'

const PVStats = () => {
  const previewFetcher = () => fetch(`/api/stats`).then((res) => res.json())
  const { data: stats, error } = useSWR('stats', previewFetcher)

  const text = '年访问'

  if (error) return <span>??? {text}</span>
  if (!stats) return <span className="animate-pulse">- {text}</span>

  let sum = 0

  if (Array.isArray(stats.pv)) {
    sum = stats.pv.reduce(
      (accumulator: number, currentValue: number): number =>
        accumulator + currentValue,
      0
    )
  }

  return (
    <span>
      {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {text}
    </span>
  )
}

export default PVStats
