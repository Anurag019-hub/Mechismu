import { Helmet } from 'react-helmet-async'
import { CarsPage } from '../features/cars'

export default function Cars() {
  return (
    <>
      <Helmet>
        <title>Formula Student Cars | Team Mechismu</title>
        <meta
          name="description"
          content="Explore Team Mechismu's Formula Student electric race cars, designs, specifications, and performance milestones."
        />
      </Helmet>

      <CarsPage />
    </>
  )
}