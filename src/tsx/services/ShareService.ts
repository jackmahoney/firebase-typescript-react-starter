import * as queryString from "query-string";

const paramName = "id"

export function setShareId(id: String): void {
  window.location.search = queryString.stringify({ paramName: id });
};

export function getShareId(): string {
  const params = queryString.parse(window.location.search);
  return params[paramName];
}; 