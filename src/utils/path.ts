export function appendUrlPath(path: string) {
  return `/${
    path.startsWith("/") ? path.slice(1) : path
  }`.replace("//", "/");
}
