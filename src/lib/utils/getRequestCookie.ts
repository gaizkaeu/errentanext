// lib/getRequestCookie.ts
import { unsealData } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

/**
 * Can be called in page/layout server component.
 * @param cookies ReadonlyRequestCookies
 * @returns SessionUser or null
 */
export async function getRequestCookie(
  cookies: ReadonlyRequestCookies
): Promise<string | null> {
  const cookieName = "myapp_cookiename"
  const found = cookies.get(cookieName);

  if (!found) return null;

  const { jwt } = await unsealData(found.value, {
    password: "complex_password_at_least_32_characters_long" as string,
  });

  return jwt as unknown as string;
}