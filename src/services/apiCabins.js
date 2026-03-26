import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select(
      "id, created_at, name, maxCapacity, regularPrice, discount, description, image",
    )
    .order("created_at", { ascending: false });

  // Backward compatibility for schemas that do not have an `image` column.
  if (error && error.message?.includes("column") && error.message?.includes("image")) {
    const { data: fallbackData, error: fallbackError } = await supabase
      .from("cabins")
      .select(
        "id, created_at, name, maxCapacity, regularPrice, discount, description",
      )
      .order("created_at", { ascending: false });

    if (fallbackError) {
      console.error(fallbackError);
      throw new Error("Cabins could not be loaded");
    }

    return fallbackData;
  }

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
  if (typeof newCabin.image === "string") payload.image = newCabin.image;

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
    if (error.code === "23503") {
      throw new Error(
        "Cabin delete is blocked by the database foreign key. Apply the cascade migration for bookings.cabinId first.",
      );
    }
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
