import Api from "./Api";

export async function getAllDonors(params) {
  return await Api.get("/donors", { params });
}

export async function getSingleDonor(payload) {
  return await Api.get(`/donor/${payload.id}`);
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

export async function getSingleOrganisation() {
  return await Api.get("/organisation/:id");
}

export async function saveOrganisation(payload) {
  return await Api.post("/organisation", payload);
}

export async function deleteOrganisation() {
  return await Api.delete("/organisation/:id");
}

//Inventory
export async function getAllInventories(params) {
  return await Api.get("/inventories", { params });
}

export async function getSingleInventory() {
  return await Api.get("/inventory/:id");
}

export async function saveInventory(payload) {
  return await Api.post("/inventories", payload);
}

export async function deleteInventory() {
  return await Api.delete("/inventory/:id");
}
