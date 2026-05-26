/**
 * File: pages/Home.jsx
 */

import { Helmet } from 'react-helmet-async'
import Home from '../components/home/Home'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Team Mechismu | Formula Student EV Team</title>
        <meta
          name="description"
          content="Official website of Team Mechismu showcasing our Formula Student electric race cars, projects, team members, achievements, and sponsors."
        />
      </Helmet>

      <Home />
    </>
  )
}