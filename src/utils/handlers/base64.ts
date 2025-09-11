export function utf8ToBase64(string: string): string {
  return btoa(
    encodeURIComponent(string).replace(
      /%([0-9A-F]{2})/g,
      (_: string, p1: string) => String.fromCharCode(parseInt(p1, 16))
    )
  );
}

export function base64ToUtf8(string?: string): string | undefined {
  if (!string) {
    return string;
  }

  return decodeURIComponent(
    atob(string)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}
