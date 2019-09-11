import { get, post, del, put, patch } from "./config";

export function postLink(data) {
  /*
  Perform post request with axios client to create a link
   */
  return post("api/links/", data);
}

export function delLink(id) {
  /*
  Perform delete request with axios client to delete a link
   */
  return del(`api/links/${id}/`);
}

export function putLink(id, data) {
  /*
  Perform put request with axios client to update a link
   */
  return put(`api/links/${id}/`, data);
}

export function patchLink(id, data) {
  /*
  Perform patch request with axios client to update a link
   */
  return patch(`api/links/${id}/`, data);
}

export function getLink(id) {
  /*
  Perform a get request with axios client to retrieve a single link
   */
  return get(`api/links/${id}/`);
}

export function getLinks() {
  /*
  Perform a get request with axios client to retrieve all links
   */
  return get(`api/links/`);
}

export function clickLink(id) {
  /*
  Perform a post request, which updates the click count of a link by 1
  and returns a redirect location.
   */
  return post(`api/links/${id}/click/`);
}
