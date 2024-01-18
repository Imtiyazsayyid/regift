import Api from "./Api";

//User
export async function getAllUsers(params) {
  return await Api.get("/users", { params });
}

export async function getSingleUser() {
  return await Api.get("/users/:id");
}

export async function saveUser(payload) {
  return await Api.post("/users", payload);
}

export async function deleteUser() {
  return await Api.delete("/users/:id");
}

//Organisation
export async function getAllOrganisations(params) {
  return await Api.get("/organisations", { params });
}

export async function getSingleOrganisation() {
  return await Api.get("/organisations/:id");
}

export async function saveOrganisation(payload) {
  return await Api.post("/organisations", payload);
}

export async function deleteOrganisation() {
  return await Api.delete("/organisations/:id");
}

//Inventory
export async function getAllInventories(params) {
  return await Api.get("/inventory", { params });
}

export async function getSingleInventory() {
  return await Api.get("/inventory/:id");
}

export async function saveInventory(payload) {
  return await Api.post("/inventory", payload);
}

export async function deleteInventory() {
  return await Api.delete("/inventory/:id");
}