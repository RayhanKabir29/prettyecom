import { Link } from "react-router"

import { Button, Container, Text } from "@/components/common"

/** Placeholder for pages that aren't built yet. */
export default function NotFoundPage() {
  return (
    <Container className="flex flex-col items-start gap-5 py-24">
      <Text variant="label-eyebrow">Coming soon</Text>
      <Text variant="heading-page">This page is on its way.</Text>
      <Text variant="body-default">We're still building this part of the store.</Text>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </Container>
  )
}
