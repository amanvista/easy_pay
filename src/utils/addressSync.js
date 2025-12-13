import { setAddresses, selectAddress } from "../app/slices/addressSlice";
import addressService from "../services/addressService";

const mapAddressToComponent = (apiAddress) => ({
    id: apiAddress.id,
    label: apiAddress.address_label || 'Home',
    fullName: apiAddress.full_name,
    phone: apiAddress.phone_number,
    addressLine: apiAddress.street_building_area,
    city: apiAddress.city,
    state: apiAddress.state,
    pincode: apiAddress.zip_code,
    landmark: apiAddress.landmark || '',
    note: apiAddress.delivery_instructions || '',
    isDefault: apiAddress.is_default,
    latitude: apiAddress.latitude ? parseFloat(apiAddress.latitude) : null,
    longitude: apiAddress.longitude ? parseFloat(apiAddress.longitude) : null,
  });
export const syncAddressesFromApi = async ({
  dispatch,
  onLoading,
  onError,
}) => {
  try {
    onLoading?.(true);

    const addresses = await addressService.getAllAddresses();
    const mappedAddresses = addresses.map(mapAddressToComponent);

    // Redux
    dispatch(setAddresses(mappedAddresses));

    // localStorage
    localStorage.setItem("savedAddresses", JSON.stringify(mappedAddresses));

    // select default
    const defaultAddress =
      mappedAddresses.find((a) => a.isDefault) || mappedAddresses[0];

    if (defaultAddress) {
      dispatch(selectAddress(defaultAddress));
      localStorage.setItem("selectedAddress", JSON.stringify(defaultAddress));
    }
  } catch (error) {
    console.error("Failed to sync addresses:", error);
    onError?.(error);
  } finally {
    onLoading?.(false);
  }
};
