import * as Location from "expo-location";

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number
) => {
  try {
    const [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (address) {
      // Construct a readable address string
      const readableAddress = `${address.name ?? ""} ${address.street ?? ""}, ${
        address.city ?? ""
      }, ${address.region ?? ""}, ${address.postalCode ?? ""}, ${
        address.country ?? ""
      }`;

      return readableAddress.trim();
    }
    return "You are here";
  } catch (error) {
    console.error("Error getting address:", error);
    return "You are here";
  }
};
