import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';

const DeadlinePicker = ({deadline,setDeadline}) => {   
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
        <Stack spacing={3} sx={{width:{xs:'100%',md:'50%'}}}>
            <DateTimePicker
                label="Deadline"
                renderInput={(params) => <TextField {...params} />}
                inputFormat="DD/MM/YYYY hh:mm a"
                value={deadline}
                onChange={(newValue) => {
                  setDeadline(newValue.$d);
                  console.log(newValue.$d)
                }}
                />
        </Stack>
    </LocalizationProvider>
  )
}

export default DeadlinePicker