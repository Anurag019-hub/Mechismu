import { Helmet } from 'react-helmet-async'
import { WinsPage } from '../features/wins'

export default function Wins() {
  return (
    <>
      <Helmet>
        <title>Achievements & Wins | Team Mechismu</title>
        <meta
          name="description"
          content="Discover Team Mechismu's competition wins, achievements, milestones, and Formula Student accomplishments."
        />

        <meta property="og:title" content="Achievements & Wins | Team Mechismu" />
        <meta
          property="og:description"
          content="Discover Team Mechismu's competition wins and achievements."
        />
        <meta property="og:url" content="https://mechismu.nvcti.in/wins" />
        <meta property="og:type" content="website" />
      </Helmet>

      <WinsPage />
    </>
  )
}