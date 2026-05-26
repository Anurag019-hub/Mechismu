import { Helmet } from 'react-helmet-async'
import { SponsorsPage } from '../features/sponsors'

export default function Sponsors() {
  return (
    <>
      <Helmet>
        <title>Sponsors | Team Mechismu</title>
        <meta
          name="description"
          content="Meet the sponsors and partners supporting Team Mechismu in building Formula Student electric race cars and engineering innovation."
        />

        <meta property="og:title" content="Sponsors | Team Mechismu" />
        <meta
          property="og:description"
          content="Meet the sponsors and partners supporting Team Mechismu."
        />
        <meta property="og:url" content="https://mechismu.nvcti.in/sponsors" />
        <meta property="og:type" content="website" />
      </Helmet>

      <SponsorsPage />
    </>
  )
}