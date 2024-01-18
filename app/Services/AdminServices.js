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
