import { create } from 'zustand';
import { ProductType } from '../pages/products/ProductDataIndex';
import { LocalStorageElements } from '../utils/clearLocalStorage';
import { Requests } from '../requests/Requests';

interface ProductStore {
  allProductData: ProductType[] | null;
  selectedProduct: ProductType | null;
  setAllProductData: (data: ProductType[]) => void;
  setSelectedProduct: (product: ProductType | null) => void;
  getAllProductData: () => Promise<void>;
  deleteProduct: (itemId: number) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  allProductData: null,
  selectedProduct: null,
  setAllProductData: (data) => set({ allProductData: data }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  getAllProductData: async () => {
    const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN);
    try {
      const response = await Requests.GET(
        "/subapps/mycuttingboard/admin/all-product-data",
        false,
        true,
        accessToken as string
      );
      set({ allProductData: response.data });
    } catch (error) {
      console.error('Error fetching product data:', error); 
    }
  },

  deleteProduct: async (itemId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const accessToken = localStorage.getItem(LocalStorageElements.ACCESS_TOKEN);
      try {
        const response = await Requests.DELETE(
          `/subapps/mycuttingboard/admin/delete-product/${itemId}`,
          accessToken as string
        );
        if (response.status === 200) {
          alert("Product deleted successfully");
          set((state) => ({
            allProductData: state.allProductData?.filter((product) => product.id !== itemId)
          }));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  },

}));

export default useProductStore;
