import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select(
      "id, created_at, name, maxCapacity, regularPrice, discount, description",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const payload = {
    name: newCabin.name,
    maxCapacity: Number(newCabin.maxCapacity),
    regularPrice: Number(newCabin.regularPrice),
    discount: Number(newCabin.discount),
    description: newCabin.description,
  };

  let query = supabase.from("cabins");

  if (!id) query = query.insert([payload]);
  if (id) query = query.update(payload).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      id ? "Cabin could not be updated" : "Cabin could not be created",
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
