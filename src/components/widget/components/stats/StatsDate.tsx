import { useTheme } from 'next-themes'
import { CSSProperties, useEffect, useMemo, useState } from 'react'

interface StatsDateProps {
  isWidescreen: boolean
}

const StatsDate = ({ isWidescreen }: StatsDateProps) => {
  const { resolvedTheme, systemTheme, theme } = useTheme()

  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    setCurrentTheme(resolvedTheme || systemTheme || theme || 'light')
  }, [resolvedTheme, systemTheme, theme])

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const transform = isWidescreen ? 'scale(1)' : 'scale(0.8)'

  const getMonthInfo = (monthsAgo: number) => {
    const date = new Date(currentDate)
    date.setMonth(currentMonth - monthsAgo)
    return { month: date.getMonth(), year: date.getFullYear() }
  }

  const textStyle = useMemo(() => {
    return ({
      month,
      year,
    }: {
      month: number
      year: number
    }): CSSProperties => ({
      fontSize: 10,
      fontWeight: 500,
      lineHeight: 1,
      transform,
      color:
        year === currentYear
          ? currentTheme === 'dark'
            ? '#ffffff'
            : '#000000'
          : '#bababa',
    })
  }, [transform, currentYear, currentTheme])

  const months = [12, 6, 0].map(getMonthInfo)

  return (
    <p className="flex justify-between">
      {months.map(({ month, year }) => (
        <span
          key={`${month}-${year}`}
          className="text-black dark:text-white"
          style={textStyle({ month, year })}
        >
          {month === 0 ? 12 : month.toString().padStart(2, '0')}
        </span>
      ))}
    </p>
  )
}

export default StatsDate
