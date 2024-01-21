import Api from "./Api";

// Donor
export async function getAllDonors(params) {
  return await Api.get("/donors", { params });
}

export async function getSingleDonor(id) {
  return await Api.get(`/donor/${id}`);
}

export async function saveDonor(payload) {
  return await Api.post("/donors", payload);
}

export async function deleteDonor(id) {
  return await Api.delete(`/donor/${id}`);
}

//Organisation
export async function getAllOrganisations(params) {
  return await Api.get("/organisations", { params });
}

export async function getSingleOrganisation(id) {
  return await Api.get(`/organisation/${id}`);
}

export async function saveOrganisation(payload) {
  return await Api.post("/organisations", payload);
}

export async function deleteOrganisation(id) {
  return await Api.delete(`/organisation/${id}`);
}

//Inventory
export async function getAllInventories(params) {
  return await Api.get("/inventories", { params });
}

export async function getSingleInventory(id) {
  return await Api.get(`/inventory/${id}`);
}

export async function saveInventory(payload) {
  return await Api.post("/inventories", payload);
}

export async function deleteInventory(id) {
  return await Api.delete(`/inventory/${id}`);
}

// Category
export async function getAllCategories(params) {
  return await Api.get("/categories", { params });
}

export async function getSingleCategory(id) {
  return await Api.get(`/category/${id}`);
}

export async function saveCategory(payload) {
  return await Api.post("/categories", payload);
}

export async function deleteCategory(id) {
  return await Api.delete(`/category/${id}`);
}

// Donated Item
export async function getAllDonatedItems(params) {
  return await Api.get("/donated-items", { params });
}

export async function getSingleDonatedItem(id) {
  return await Api.get(`/donated-item/${id}`);
}

export async function deleteDonatedItem(id) {
  return await Api.delete(`/donated-item/${id}`);
}
