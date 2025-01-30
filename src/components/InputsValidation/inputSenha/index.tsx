import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  placeholder,
  error,
  register,
  value,
  onChange,
  className,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Form.Group controlId={`form-${name}`} className={className}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          {...(register
            ? register(name) // Uso com react-hook-form
            : { value, onChange })} // Uso com estado controlado
          isInvalid={!!error}
        />
        <InputGroup.Text onClick={() => setVisible(!visible)} style={{ cursor: "pointer" }}>
          {visible ? <FaEyeSlash /> : <FaEye />}
        </InputGroup.Text>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};
