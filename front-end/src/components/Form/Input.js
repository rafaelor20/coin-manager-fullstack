import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  error,
  helperText,
  disabled,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <InputGroup>
      {label && (
        <Label>
          {label} {required && <Required>*</Required>}
        </Label>
      )}
      <InputWrapper hasIcon={!!icon} hasError={!!error}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          disabled={disabled}
          required={required}
          {...props}
        />
        {isPassword && (
          <TogglePasswordButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </TogglePasswordButton>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputGroup>
  );
};

export default Input;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  margin-bottom: 1.15rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #cbd5e1;
  letter-spacing: 0.01em;
`;

const Required = styled.span`
  color: #f43f5e;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid
    ${(props) => (props.hasError ? '#f43f5e' : 'rgba(255, 255, 255, 0.12)')};
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus-within {
    border-color: ${(props) => (props.hasError ? '#f43f5e' : '#818cf8')};
    box-shadow: 0 0 0 3px
      ${(props) =>
    props.hasError
      ? 'rgba(244, 63, 94, 0.2)'
      : 'rgba(99, 102, 241, 0.25)'};
    background: rgba(15, 23, 42, 0.85);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  color: #64748b;
  font-size: 1.15rem;
`;

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #f8fafc;
  font-family: inherit;

  &::placeholder {
    color: #64748b;
    font-size: 0.9rem;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Remove number arrows if needed */
  &[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 1;
    }
  }
`;

const TogglePasswordButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #f8fafc;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.78rem;
  color: #fb7185;
  margin-top: 0.1rem;
`;

const HelperText = styled.span`
  font-size: 0.78rem;
  color: #64748b;
  margin-top: 0.1rem;
`;
