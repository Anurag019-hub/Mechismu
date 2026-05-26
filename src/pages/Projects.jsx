import { Helmet } from 'react-helmet-async'
import { ProjectsPage } from '@/features/projects'

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects | Team Mechismu</title>
        <meta
          name="description"
          content="Explore Team Mechismu's engineering projects, EV innovations, research work, and technical developments."
        />
      </Helmet>

      <ProjectsPage />
    </>
  )
}