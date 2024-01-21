import { Category } from "./CategoryInterface";
import { Donor } from "./DonorInterface";

export type DonatedItem = {
  id: number;
  title: string;
  image: string;
  description: string | null;
  quantity: number;
  condition: "new" | "like_new" | "used_good" | "used_fair" | "used_poor";
  pickupAddress: string | null;
  isPickupAvailable: boolean;
  approvalStatus: "pending" | "approved" | "rejected";

  donorId: number;
  donor: Donor;

  categoryId: number;
  category: Category;

  status: boolean;
  created_at: Date;
  updated_at: Date;
};
