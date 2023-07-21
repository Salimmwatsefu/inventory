import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type Sales = {
  product_id: number;
  product: any;
  id: string;
  title: string;
  quantity: number;
  amount: number;
  date: string;
};


export default function ManageSales() {

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Sales[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});
  const apiURL = 'http://localhost:3001'
  const {token} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get(`${apiURL}/sales` , {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          },
        });
        const salesData = salesResponse.data;
  
        // Fetch product titles for each sale
        const productIds = salesData.map((sale: { product_id: any; }) => sale.product_id).join(',');
        const productsResponse = await axios.get(`${apiURL}/products?ids=${productIds}` , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const productsData = productsResponse.data;
  
        // Map product titles to sales based on product_id
        const salesWithProductTitles = salesData.map((sale: { product_id: any; }) => {
          const product = productsData.find((product: { id: any; }) => product.id === sale.product_id);
          return {
            ...sale,
            title: product ? product.title : 'Unknown', // Use 'Unknown' if product title is not found
          };
        });
  
        setTableData(salesWithProductTitles);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
  
    fetchData();
  }, [token]);
  

  const handleCreateNewRow = async (values: Sales) => {
    try {
      // Fetch the corresponding product based on the title
      const productResponse = await axios.get(`${apiURL}/products?title=${values.title}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const productData = productResponse.data;
      if (productData.length === 0) {
        throw new Error(`Product not found for title: ${values.title}`);
      }
  
      // Create a new sale with the product's ID and product's name
      const product = productData[0];
      const newSale = {
        ...values,
        title: product.title, // Use the product's name as the title
        product_id: product.id, // Add the product's ID as product_id
      };
  
      const response = await axios.post(`${apiURL}/sales`,newSale, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        
      });
      const data = response.data;
      const newRow = { ...data, title: product.title };
      setTableData([...tableData, newRow]);
      toast.success(`Sale added successfully!`, {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        transition: Slide,
        style: {
          backgroundColor: 'white',
          color: 'black',
        },
      });
    } catch (error) {
      console.error('Error creating new row:', error);
    }
  };
  


  const handleDeleteRow = useCallback(async (row: MRT_Row<Sales>) => {
    if (!confirm(`Are you sure you want to delete ${row.getValue('title')}`)) {
      return;
    }
  
    try {
      await axios.delete(`${apiURL}/sales/${row.original.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }, [token, setTableData]);
  

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Sales>,
    ): MRT_ColumnDef<Sales>['muiTableBodyCellEditTextFieldProps'] => {
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


  const columns = useMemo<MRT_ColumnDef<Sales>[]>(
    () => [
      
      {
        accessorKey: 'title',
        header: 'PRODUCT TITLE',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'amount',
        header: 'Total Amount',
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
    <div>
      <h1 className='my-5 text-center font-black text-4xl text-orange-600 tracking-wider uppercase'>All Sales</h1>
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
        data={tableData} //default
        enableColumnOrdering
        enableEditing
        
        renderRowActions={({ row, table }) => (
          <Box sx={{ alignItems : 'center', display: 'flex', justifyContent: 'center'  }}>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <button
            className='bg-orange-500 h-10 rounded-2xl hover:bg-orange-700'
            onClick={() => setCreateModalOpen(true)}
          >
            <span className='mx-5 font-bold text-base uppercase'>Add New</span>
          </button>
        )}
      />
      </div>
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
       <ToastContainer />
    </div>
  );
};

interface CreateModalProps {
  columns: MRT_ColumnDef<Sales>[];
  onClose: () => void;
  onSubmit: (values: Sales) => void;
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
      <DialogTitle textAlign="center">Create New Sale</DialogTitle>
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
