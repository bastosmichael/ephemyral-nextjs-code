import fs from "fs"
import path from "path"

interface CoverageMetrics {
  total: {
    lines: { pct: number }
    statements: { pct: number }
    functions: { pct: number }
    branches: { pct: number }
  }
}

const coverageSummaryPath = path.join(
  __dirname,
  "..",
  "coverage",
  "coverage-summary.json"
)

try {
  if (!fs.existsSync(coverageSummaryPath)) {
    throw new Error(
      "Coverage summary file not found. Please run the tests with coverage first."
    )
  }

  const coverageSummary: CoverageMetrics = JSON.parse(
    fs.readFileSync(coverageSummaryPath, "utf8")
  )

  const total = coverageSummary.total
  const overallCoverage = (
    (total.lines.pct +
      total.statements.pct +
      total.functions.pct +
      total.branches.pct) /
    4
  ).toFixed(2)

  console.log(`\nDetailed Coverage Report:`)
  console.log(`----------------------------------------`)
  console.log(`Lines: ${total.lines.pct}%`)
  console.log(`Statements: ${total.statements.pct}%`)
  console.log(`Functions: ${total.functions.pct}%`)
  console.log(`Branches: ${total.branches.pct}%`)
  console.log(`----------------------------------------`)
  console.log(`Overall Coverage: ${overallCoverage}%\n`)

  process.exit(0)
} catch (error) {
  console.error("Error calculating overall coverage:", error.message)
  process.exit(1)
}
