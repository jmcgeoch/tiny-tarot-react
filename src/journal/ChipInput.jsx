import { useState } from 'react';
import useAutocomplete from '@mui/base/useAutocomplete';
import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const filter = createFilterOptions();

export default function ChipInput() {
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        defaultValue: [],
        multiple: true,
        options: basicTags,
        getOptionLabel: (option) => option,
    });

    return (
        <div>
            <div {...getRootProps()}>
                <div ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    {value.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} />
                    ))}

                    <input {...getInputProps()} />
                </div>
            </div>
            {
                groupedOptions.length > 0 ? (
                    <ul {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <li {...getOptionProps({ option, index })}>
                                <span>{option}</span>
                                <FontAwesomeIcon icon={faCheck} size={'sm'} />
                            </li>
                        ))}
                    </ul>
                )
                    : null
            }
        </div>
    );
}

const basicTags = [
    '1 Card',
    '2 Card',
    '3 Card',

]