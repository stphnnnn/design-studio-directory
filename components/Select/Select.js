import React from "react";
import styled from "@emotion/styled";
import Downshift from "downshift";
import VisuallyHidden from "../VisuallyHidden";

const sizes = {
  LARGE: 100,
  SMALL: 75
};

const Input = styled.input`
  width: 350px;
  height: ${props => (props.isCompact ? sizes.SMALL : sizes.LARGE)}px;
  padding: 2rem;
  border-radius: 0;
  border: none;
  background-color: ${props => (!props.isCompact ? "#242F47" : "#1A2233")};
  color: white;
  font-weight: 600;
  &::placeholder {
    color: white;
    font-weight: 600;
    opacity: ${props => (props.isCompact ? 0.25 : undefined)};
  }
`;

const Select = ({
  disabled,
  label,
  options = [],
  onChange = Function.prototype,
  onOpen = Function.prototype,
  onClose = Function.prototype,
  isCompact
}) => {
  const handleStateChange = changes => {
    if (changes.isOpen === true) {
      return onOpen();
    }

    if (changes.isOpen === false) {
      return onClose();
    }
  };

  return (
    <div>
      <Downshift onChange={onChange} onStateChange={handleStateChange}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          highlightedIndex,
          selectedItem
        }) => (
          <div
            style={{
              position: "relative",
              top: isCompact ? (sizes.LARGE - sizes.SMALL) / 2 : undefined
            }}
          >
            <VisuallyHidden>
              <label {...getLabelProps()}>{label}</label>
            </VisuallyHidden>
            <button
              {...getToggleButtonProps({
                "aria-label": isOpen ? "close menu" : "open menu"
              })}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100%",
                background: "none",
                cursor: !disabled ? "pointer" : "auto",
                border: "none"
              }}
              disabled={disabled}
            />
            <Input
              {...getInputProps({
                disabled: true
              })}
              placeholder={label}
              isCompact={isCompact}
            />
            <ul
              {...getMenuProps()}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                margin: 0
              }}
            >
              {isOpen &&
                options.map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : null,
                        fontWeight: selectedItem === item ? "bold" : "normal",
                        cursor: "pointer"
                      }
                    })}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
};

// import Select from 'react-select';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

// const customStyles = {
//   control: (styles, state) => ({
//     ...styles,
//     width: 350,
//     height: state.isDisabled ? 75 : 100,
//     padding: '1rem',
//     borderRadius: 0,
//     border: 'none',
//     backgroundColor: state.isDisabled ? '#1A2233' : '#242F47',
//   }),
//   dropdownIndicator: (styles, state) => ({
//     ...styles,
//     opacity: state.isDisabled ? 0.25 : 1,
//   }),
//   placeholder: (styles, state) => ({
//     ...styles,
//     color: 'white',
//     fontWeight: 600,
//     opacity: state.isDisabled ? 0.25 : 1,
//   }),
//   indicatorSeparator: styles => ({ display: 'none' }),
// };

// const CustomSelect = ({ label, disabled }) => (
//   <div
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//     }}
//   >
//     <Select
//       label={label}
//       placeholder={label}
//       styles={customStyles}
//       options={options}
//       isDisabled={disabled}
//     />
//   </div>
// );

export default Select;
