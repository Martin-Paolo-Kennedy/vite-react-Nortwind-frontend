import {Categoria} from '../Modelo/categoria'

const API_BASE_URL = 'http://localhost:8090/url/categoria';


export interface RespuestaMensaje {
  categoryID: number;
  mensaje: string;
}

class CategoriaService {
  // Obtener lista de categorías
  async listaCategoria(): Promise<Categoria[]> {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }
    return response.json() as Promise<Categoria[]>; // Tipado explícito
  }

  // Obtener categorías por nombre
  async listaCategoriaPorNombreLike(nom: string): Promise<Categoria[]> {
    const response = await fetch(`${API_BASE_URL}/listaCategoriaPorNombreLike/${nom}`);
    if (!response.ok) {
      throw new Error('Error al buscar las categorías');
    }
    return response.json();
  }

// Servicio en Vite con TypeScript
async registraCategoria(categoria: Omit<Categoria, 'categoryID'>): Promise<{ mensaje: string; categoryID?: number }> {
  const response = await fetch(`${API_BASE_URL}/registraCategoria`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoria),
  });
  if (!response.ok) {
    throw new Error('Error al registrar la categoría');
  }
  return response.json();
}



  // Actualizar categoría existente
  async actualizaCategoria(categoria: Categoria): Promise<RespuestaMensaje> {
    const response = await fetch(`${API_BASE_URL}/actualizaCategoria`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la categoría');
    }
    return response.json();
  }

  async eliminaCategoria(idCategoria: number): Promise<RespuestaMensaje> {
    const response = await fetch(`${API_BASE_URL}/eliminaCategoria/${idCategoria}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la categoría');
    }
    return response.json();
  }
  
  
}

export default new CategoriaService();
