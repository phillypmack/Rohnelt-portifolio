import { CaseStudies } from "@/components/case-studies"
import { Contact, Footer } from "@/components/contact"
import { FleetLedger } from "@/components/fleet-ledger"
import { FleetProvider } from "@/components/fleet-provider"
import { Masthead } from "@/components/masthead"
import { Operations } from "@/components/operations"
import { Thesis } from "@/components/thesis"
import { getFleetReport } from "@/lib/fleet"

export default async function Home() {
  // Probed on the server so the ledger arrives already true, with no flicker
  // and no layout that depends on JavaScript having run.
  const report = await getFleetReport()

  return (
    <FleetProvider initial={report}>
      <Masthead />
      <main>
        <Thesis />
        <FleetLedger />
        <CaseStudies />
        <Operations />
        <Contact />
      </main>
      <Footer />
    </FleetProvider>
  )
}
