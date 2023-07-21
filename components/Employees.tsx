import React, { useCallback, useMemo, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
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

export type Employee = {
  id: number
  name: string;
  job_title: number;
  salary: number;
  phone_number: string;
  start_date: string;
};


export default function Employees() {

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Employee[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const { token } = useContext(AuthContext);

  const apiURL = 'http://localhost:3001'

//use effect
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/employees`, {
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
const handleCreateNewRow = async (values: Employee) => {
  try {
    const response = await axios.post(`${apiURL}/employees`, values, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
        'Content-Type': 'application/json',
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
const handleSaveRowEdits: MaterialReactTableProps<Employee>['onEditingRowSave'] = async ({
  exitEditingMode,
  row,
  values,
}) => {
  if (!Object.keys(validationErrors).length) {
    try {
      const response = await axios.put(`${apiURL}/employees/${values.id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
          'Content-Type': 'application/json',
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
  const handleDeleteRow = useCallback(async (row: MRT_Row<Employee>) => {
    if (!confirm(`Are you sure you want to delete ${row.getValue('title')}`)) {
      return;
    }
  
    try {
      await axios.delete(`${apiURL}/employees/${row.original.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }, [tableData, token]);;
  

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Employee>,
    ): MRT_ColumnDef<Employee>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        
      };
    },
    [validationErrors],
  );


  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
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
        accessorKey: 'name',
        header: 'Name',
        enableEditing: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'job_title',
        header: 'Job Title',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'start_date',
        header: 'Start Date',
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
      <h1 className='my-5 text-center font-black text-4xl text-orange-600 tracking-wider uppercase'>Employees</h1>
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
  columns: MRT_ColumnDef<Employee>[];
  onClose: () => void;
  onSubmit: (values: Employee) => void;
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
      <DialogTitle textAlign="center">Add New</DialogTitle>
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

