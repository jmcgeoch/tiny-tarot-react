import { useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const filter = createFilterOptions({
    trim: true,
    ignoreCase: true
});

export default function ChipInput() {
    const [value, setValue] = useState([]);
    const [chipData, setChipData] = useState([]);
    
      const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };

    return (
        <Autocomplete
            value={value}
            multiple={true}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                      title: newValue.inputValue,
                    });
                  } else {
                    setValue(newValue);
                  }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title.toLowerCase());
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={basicTags}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(props, option) => <div {...props}><p>{option.title}</p></div>}
            sx={{ width: '100%' }}
            freeSolo
            limitTags={3}
            renderInput={(params) => (
                <>
                    {chipData.map((option, index) => (
                        <Chip label={option.title} size={'small'}
                        onDelete={handleDelete(option)}
                        key={option.title} />
                    ))}
                    <TextField {...params} />
                </>

            )}
        />
    );
}

const basicTags = [
    {title: '1 Card'},
    {title: '2 Card'},
    {title: '3 Card'},
    {title: 'Full Moon'},
    {title: 'New Moon'},
    {title: 'First Quarter Moon'},
    {title: 'Last Quarter Moon'},
]