import supabase from '../lib/supabaseClient';

// Ürün tipi tanımlaması
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  created_at: string;
  category?: string;
};

/**
 * Tüm ürünleri Supabase'den getiren fonksiyon
 * @returns Ürün listesi veya hata durumunda boş dizi
 */
export const getAllProducts = async (category?: string): Promise<Product[]> => {
  try {
    let query = supabase.from('products').select('*');
    
    // Eğer kategori belirtilmişse, filtreleme yap
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Ürünler getirilirken hata oluştu:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Beklenmeyen hata:', error);
    return [];
  }
};

/**
 * ID'ye göre tek bir ürünü Supabase'den getiren fonksiyon
 * @param id Ürün UUID'si
 * @returns Ürün nesnesi veya null
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`UUID: ${id} olan ürün getirilirken hata oluştu`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Beklenmeyen hata:', error);
    return null;
  }
};

