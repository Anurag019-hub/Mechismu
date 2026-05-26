import { Helmet } from 'react-helmet-async'
import { ContactPage } from '../features/contact'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Team Mechismu</title>
        <meta
          name="description"
          content="Get in touch with Team Mechismu for sponsorships, collaborations, media inquiries, and general contact."
        />
      </Helmet>

      <ContactPage />
    </>
  )
}