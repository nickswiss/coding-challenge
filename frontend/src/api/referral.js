import { get, post, del, put, patch } from "./config";

export function postLink(data) {
  return post("api/links/", data);
}

export function delLink(id) {
  return del(`api/links/${id}/`);
}

export function putLink(id, data) {
  return put(`api/links/${id}/`, data);
}

export function patchLink(id, data) {
  return patch(`api/links/${id}/`, data);
}

export function getLink(id) {
  return get(`api/links/${id}/`);
}

export function getLinks() {
  return get(`api/links/`);
}

export function clickLink(id) {
  return post(`api/links/${id}/click/`);
}
