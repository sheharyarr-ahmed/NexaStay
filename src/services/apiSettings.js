import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const runUpdate = (payload) =>
    supabase
      .from("settings")
      .update(payload)
      // There is only ONE row of settings, and it has the ID=1
      .eq("id", 1)
      .select()
      .single();

  let { data, error } = await runUpdate(newSetting);

  // Handle common schema mismatch for guest field naming.
  if (error && error.code === "42703") {
    const field = Object.keys(newSetting)[0];
    const alternateField =
      field === "maxGuestsPerBooking"
        ? "maxGuestPerBooking"
        : field === "maxGuestPerBooking"
          ? "maxGuestsPerBooking"
          : null;

    if (alternateField) {
      const value = newSetting[field];
      ({ data, error } = await runUpdate({ [alternateField]: value }));
    }
  }

  if (error) {
    console.error(error);
    throw new Error(error.message || "Settings could not be updated");
  }

  return data;
}
