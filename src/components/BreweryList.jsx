import '../styles/BreweryList.css' // Importing the CSS for styling
const BreweryList = ({ breweries, loading }) => {
  if (loading) {
    return (
      <div className="brewery-table-container">
        <table className="brewery-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th className="hide-mobile">City</th>
              <th className="hide-mobile">State</th>
              <th className="hide-tablet">Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td>
                    <div className="skeleton skeleton-text"></div>
                  </td>
                  <td>
                    <div className="skeleton skeleton-badge"></div>
                  </td>
                  <td className="hide-mobile">
                    <div className="skeleton skeleton-text-sm"></div>
                  </td>
                  <td className="hide-mobile">
                    <div className="skeleton skeleton-text-sm"></div>
                  </td>
                  <td className="hide-tablet">
                    <div className="skeleton skeleton-text"></div>
                  </td>
                  <td>
                    <div className="skeleton skeleton-button"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (breweries.length === 0) {
    return (
      <div className="empty-state">
        <h3>No breweries found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  const getTypeClass = (type) => {
    const types = {
      micro: "badge-blue",
      nano: "badge-green",
      regional: "badge-purple",
      brewpub: "badge-amber",
      large: "badge-red",
      planning: "badge-gray",
      bar: "badge-orange",
      contract: "badge-cyan",
      proprietor: "badge-pink",
      closed: "badge-slate",
    }
    return types[type] || "badge-default"
  }

  const formatPhoneNumber = (phoneStr) => {
    if (!phoneStr) return "N/A"
    const cleaned = phoneStr.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return phoneStr
  }

  return (
    <div className="brewery-table-container">
      <table className="brewery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th className="hide-mobile">City</th>
            <th className="hide-mobile">State</th>
            <th className="hide-tablet">Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {breweries.slice(0, 20).map((brewery) => (
            <tr key={brewery.id}>
              <td className="brewery-name">{brewery.name}</td>
              <td>
                <span className={`badge ${getTypeClass(brewery.brewery_type)}`}>{brewery.brewery_type}</span>
              </td>
              <td className="hide-mobile">{brewery.city || "N/A"}</td>
              <td className="hide-mobile">{brewery.state || "N/A"}</td>
              <td className="hide-tablet">
                {brewery.phone ? (
                  <div className="phone-container">
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
                      className="icon"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    {formatPhoneNumber(brewery.phone)}
                  </div>
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <div className="action-buttons">
                  {brewery.website_url && (
                    <a
                      href={brewery.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button"
                      title="Visit Website"
                    >
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
                        className="icon"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                  {brewery.latitude && brewery.longitude && (
                    <a
                      href={`https://maps.google.com/?q=${brewery.latitude},${brewery.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button"
                      title="View on Map"
                    >
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
                        className="icon"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BreweryList

