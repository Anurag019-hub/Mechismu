import { Helmet } from 'react-helmet-async'
import AchievementsPage from '../components/achievements/AchievementsPage'

export default function Achievements() {
  return (
    <>
      <Helmet>
        <title>Achievements | Team Mechismu</title>
        <meta
          name="description"
          content="Explore Team Mechismu's achievements, competition milestones, and Formula Student accomplishments."
        />
      </Helmet>

      <AchievementsPage />
    </>
  )
}