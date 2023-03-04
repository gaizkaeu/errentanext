const ahoyConfigured = async () => {
  const ahoyConfigured = (await import('ahoy.js')).default
  ahoyConfigured.configure({
    visitsUrl: `http://localhost:3000/ahoy/visits`,
    eventsUrl: `http://localhost:3000/ahoy/events`,
    trackVisits: true,
  })
  return ahoyConfigured;
}

export { ahoyConfigured }