export function problemFor(e: unknown) {
  if (e instanceof Error && e.message === "timeout")
    return "The server took too long. Try again.";
  if (e instanceof TypeError)
    return "No connection. Check your Wi-Fi and try again.";
  if (e instanceof Error && e.message === "404")
    return "That list is not there any more.";
  return "Something went wrong.";
}

export type Status = "loading" | "empty" | "error" | "content";
