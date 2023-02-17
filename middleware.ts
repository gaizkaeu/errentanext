// See "Matching Paths" below to learn more
// Only set edge runtime for middleware, otherwise pages break due to nodejs requirement
export const config = {
  runtime: 'experimental-edge',
  matcher: "/",
};