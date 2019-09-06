import { get, post, del, put } from "./config";

export function postLink(data) {
  return post("api/links/", data);
}

export function deleteLink(id) {
  return del(`api/links/${id}/`);
}

export function putLink(id, data) {
  return put(`api/links/${id}/`, data);
}

export function getLink(id) {
  return get(`api/links/${id}/`);
}

export function getLinks() {
  return get(`api/links/`);
}
