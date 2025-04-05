import "../styles/Statistics.css"

const Statistics = ({ breweries }) => {
  // Calculate statistics
  const totalBreweries = breweries.length

  // Count by type
  const typeCount = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || "unknown"
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  // Find most common type
  let mostCommonType = "none"
  let maxCount = 0
  Object.entries(typeCount).forEach(([type, count]) => {
    if (count > maxCount) {
      mostCommonType = type
      maxCount = count
    }
  })

  // Count by state
  const stateCount = breweries.reduce((acc, brewery) => {
    const state = brewery.state || "unknown"
    acc[state] = (acc[state] || 0) + 1
    return acc
  }, {})

  // Find state with most breweries
  let topState = "none"
  maxCount = 0
  Object.entries(stateCount).forEach(([state, count]) => {
    if (count > maxCount && state !== "unknown") {
      topState = state
      maxCount = count
    }
  })

  // Calculate percentage with websites
  const withWebsites = breweries.filter((b) => b.website_url).length
  const websitePercentage = totalBreweries > 0 ? Math.round((withWebsites / totalBreweries) * 100) : 0

  return (
    <>
      <div className="stat-card">
        <div className="stat-header">
          <h3 className="stat-title">Total Breweries</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stat-icon"
          >
            <path d="M17 14h.01"></path>
            <path d="M7 7h.01"></path>
            <path d="M7 14h.01"></path>
            <path d="M17 7h.01"></path>
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          </svg>
        </div>
        <div className="stat-content">
          <div className="stat-value">{totalBreweries}</div>
          <p className="stat-description">{Object.keys(typeCount).length} different types</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-header">
          <h3 className="stat-title">Most Common Type</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stat-icon"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div className="stat-content">
          <div className="stat-value capitalize">{mostCommonType}</div>
          <p className="stat-description">
            {typeCount[mostCommonType] || 0} breweries (
            {Math.round(((typeCount[mostCommonType] || 0) / totalBreweries) * 100)}%)
          </p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-header">
          <h3 className="stat-title">Top State</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stat-icon"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div className="stat-content">
          <div className="stat-value">{topState}</div>
          <p className="stat-description">
            {stateCount[topState] || 0} breweries ({websitePercentage}% have websites)
          </p>
        </div>
      </div>
    </>
  )
}

export default Statistics

