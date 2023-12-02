import { ProfileWidget } from '../widget/ProfileWidget'
import { StatsWidget } from '../widget/StatsWidget'

export const WidgetCollection = ({
  widgets,
}: {
  widgets: { [key: string]: any }
}) => {
  return (
    <div
      className="mb-6 grid grid-cols-2 gap-4 md:gap-8 lg:gap-10"
      data-aos="fade-up"
    >
      <ProfileWidget data={widgets.profile} />
      <StatsWidget data={widgets.stats} />
    </div>
  )
}
