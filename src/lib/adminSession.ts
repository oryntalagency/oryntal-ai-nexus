const AUTH_KEY = "oryntal_admin_authed";
const PASSCODE_KEY = "oryntal_admin_passcode";
const DEFAULT_PASSCODE = "oryntal-admin";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(AUTH_KEY) === "1";
}

export function setAdminAuthed(authed: boolean): void {
  if (typeof window === "undefined") return;
  if (authed) window.sessionStorage.setItem(AUTH_KEY, "1");
  else window.sessionStorage.removeItem(AUTH_KEY);
}

export function getPasscode(): string {
  if (typeof window === "undefined") return DEFAULT_PASSCODE;
  return window.sessionStorage.getItem(PASSCODE_KEY) ?? DEFAULT_PASSCODE;
}

export function setPasscode(passcode: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(PASSCODE_KEY, passcode);
}

export function verifyPasscode(input: string): boolean {
  return input === getPasscode();
}
