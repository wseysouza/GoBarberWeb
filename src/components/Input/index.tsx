import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // input na DOM
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFileed, setIsFileed] = useState(false);

  const { fieldName, /* defaultValue, */ error, registerField } =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputRef.current?.value) {
      setIsFileed(true);
    } else {
      setIsFileed(false);
    }

    // OU setIsFilled(!!inputRef.current?.value)
  }, []);

  return (
    <Container isFocused={isFocused} isFileed={isFileed}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error}
    </Container>
  );
};

export default Input;
