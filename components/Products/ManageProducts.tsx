
import React, { useCallback, useMemo, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Home from '@/pages';

export type Product = {
  id: number
  title: string;
  instock: number;
  price: number;
  date: string;
};


export default function ManageProducts() {

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Product[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const apiURL = 'https://kuku-hub-ba097a50ef10.herokuapp.com'
  const { token } = useContext(AuthContext);

//use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          },
        });
        const data = response.data;
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
  
    fetchData();
  }, [token]);



//create a new product
  const handleCreateNewRow = async (values: Product) => {
    try {
      const response = await axios.post(`${apiURL}/products`, values, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token in the Authorization header
        },
      });
      const data = response.data;
      const newRow = { ...data, id: data.id };
      setTableData([...tableData, data]);
    } catch (error) {
      console.error('Error creating new row:', error);
    }
  };
  
//edit product
  const handleSaveRowEdits: MaterialReactTableProps<Product>['onEditingRowSave'] = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        const response = await axios.put(`${apiURL}/products/${values.id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          },
        });
        const data = response.data;
        const updatedProduct = { ...values, id: data.id };
        tableData[row.index] = data;
        setTableData([...tableData]);
        exitEditingMode();
      } catch (error) {
        console.error('Error saving row edits:', error);
      }
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };
  
//delete product
  const handleDeleteRow = useCallback(async (row: MRT_Row<Product>) => {
    if (!confirm(`Are you sure you want to delete ${row.getValue('title')}`)) {
      return;
    }
  
    try {
      await axios.delete(`${apiURL}/product/${row.original.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }, [tableData, token]);
  

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Product>,
    ): MRT_ColumnDef<Product>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );


  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'title',
        header: 'PRODUCT TITLE',
        enableEditing: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'instock',
        header: 'In-Stock',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'price',
        header: 'Selling Price',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'date',
        header: 'Date Added',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      
    ],
    [getCommonEditTextFieldProps],
  );


  return (
    <div >
      <h1 className='my-5 text-center font-black text-4xl text-orange-600 tracking-wider uppercase'>ALL Products</h1>
      <div className='mx-5'>
      
      
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <button
            className=' bg-orange-500 h-10 rounded-2xl hover:bg-orange-700'
            onClick={() => setCreateModalOpen(true)}
          >
            <span className='mx-5 font-bold text-base uppercase'>Add New</span>
          </button>
        )}
      /></div>
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </div>
  );
};

interface CreateModalProps {
  columns: MRT_ColumnDef<Product>[];
  onClose: () => void;
  onSubmit: (values: Product) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <button className='bg-yellow-500 h-10 rounded-2xl hover:bg-yellow-700' onClick={handleSubmit} >
        <span className='mx-5 font-semibold text-base uppercase'>Add New </span>
        </button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validateAge = (age: number) => age >= 18 && age <= 50;
