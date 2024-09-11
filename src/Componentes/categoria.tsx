import React, { useEffect, useState } from 'react';
import CategoriaService from '../service/categoria.Service';
import { Categoria } from '../Modelo/categoria';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TablePagination,
  IconButton,
  Modal,
  TextField,
  Button,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; // Importa el ícono de añadir
import Swal from 'sweetalert2';

const Categorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Estado para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);

  useEffect(() => {
    CategoriaService.listaCategoria()
      .then((data: Categoria[]) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError('Error al cargar las categorías');
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Función para abrir el modal para actualizar
  const handleUpdate = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setModalOpen(true);
  };

  // Función para abrir el modal para registrar una nueva categoría
  const handleAddNew = () => {
    setSelectedCategoria({ categoryID: 0, categoryName: '', description: '' }); // Crear un nuevo objeto vacío
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await CategoriaService.eliminaCategoria(id);
          if (respuesta.mensaje === 'Eliminación exitosa') {
            setCategorias((prevCategorias) =>
              prevCategorias.filter((cat) => cat.categoryID !== id)
            );
            Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
          } else {
            Swal.fire('Error!', 'No se pudo eliminar la categoría.', 'error');
          }
        } catch (err) {
          console.error('Error al eliminar categoría:', err);
          Swal.fire('Error!', 'Hubo un problema al eliminar la categoría.', 'error');
        }
      }
    });
  };
  
  
  
  
  

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCategoria(null);
  };

  const handleModalSave = () => {
    if (selectedCategoria) {
      if (selectedCategoria.categoryID === 0) {
        // Registro de nueva categoría: Excluye categoryID del objeto
        const { categoryID, ...categoriaSinID } = selectedCategoria; // Excluye el ID
  
        CategoriaService.registraCategoria(categoriaSinID)
          .then((respuesta) => {
            if (respuesta.mensaje === 'Registro exitoso') {
              // Asegúrate de que `respuesta.categoryID` esté disponible y es un número
              const nuevaCategoria = { ...categoriaSinID, categoryID: respuesta.categoryID || 0 };
              setCategorias([...categorias, nuevaCategoria]);
              Swal.fire('Registrado!', 'La categoría ha sido registrada.', 'success');
            } else {
              Swal.fire('Error!', 'No se pudo registrar la categoría.', 'error');
            }
            handleModalClose();
          })
          .catch((err) => {
            console.error('Error al registrar la categoría:', err);
            Swal.fire('Error!', 'Hubo un problema al registrar la categoría.', 'error');
          });
      } else {
        // Actualización de categoría
        CategoriaService.actualizaCategoria(selectedCategoria)
          .then(() => {
            setCategorias(
              categorias.map((cat) =>
                cat.categoryID === selectedCategoria.categoryID ? selectedCategoria : cat
              )
            );
            Swal.fire('Actualizado!', 'La categoría ha sido actualizada.', 'success');
            handleModalClose();
          })
          .catch((err) => {
            console.error('Error al actualizar categoría:', err);
            Swal.fire('Error!', 'Hubo un problema al actualizar la categoría.', 'error');
          });
      }
    }
  };
  




  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper>
      {/* Botón para registrar nueva categoría */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNew}
        style={{ margin: '10px' }}
      >
        Registrar Nueva Categoría
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre de Categoría</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((categoria) => (
                <TableRow key={categoria.categoryID}>
                  <TableCell>{categoria.categoryID}</TableCell>
                  <TableCell>{categoria.categoryName}</TableCell>
                  <TableCell>{categoria.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleUpdate(categoria)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(categoria.categoryID)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={categorias.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
      />

      {/* Modal para registrar o actualizar */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedCategoria && (
            <div>
              <Typography id="modal-title" variant="h6" component="h2">
                {selectedCategoria.categoryID === 0 ? 'Registrar Nueva Categoría' : 'Actualizar Categoría'}
              </Typography>
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                value={selectedCategoria.categoryName}
                onChange={(e) =>
                  setSelectedCategoria({ ...selectedCategoria, categoryName: e.target.value })
                }
              />
              <TextField
                label="Descripción"
                fullWidth
                margin="normal"
                value={selectedCategoria.description}
                onChange={(e) =>
                  setSelectedCategoria({ ...selectedCategoria, description: e.target.value })
                }
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleModalSave}>
                  {selectedCategoria.categoryID === 0 ? 'Registrar' : 'Guardar'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleModalClose} sx={{ ml: 2 }}>
                  Cancelar
                </Button>
              </Box>
            </div>
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default Categorias;
