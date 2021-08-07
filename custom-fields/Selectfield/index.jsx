import ProTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import { FormGroup, Label } from 'reactstrap'

SelectField.prototype = {
    field: ProTypes.object.isRequired,
    form: ProTypes.object.isRequired,

    label: ProTypes.string,
    placeholder: ProTypes.string,
    disable: ProTypes.bool,
    option: ProTypes.array,
}
SelectField.defaulProps = {
    label: '',
    placeholder: '',
    disable: false,
    option: [],
}



function SelectField(props) {
    const { field, form, type, label, placeholder, disable, options } = props;
    const { name, value } = field;
    const selectedOption = options.find(option => option.value === value);

    const handleSelectedOptionChange = (selectedOption) => {
        // console.log(selectedOption);
        const selectdValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectdValue,
            }
        }
        field.onChange(changeEvent)
    }

    return (
        <FormGroup>
            {label ? <Label for={name}>{label}</Label> : label}
            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}

                placeholder={placeholder}
                isDisabled={disable}
                options={options}
            >
            </Select>
        </FormGroup>
    );
}
export default SelectField