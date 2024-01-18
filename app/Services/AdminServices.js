import Api from "./Api";

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
