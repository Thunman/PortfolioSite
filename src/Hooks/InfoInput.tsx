import { useEffect, useState, useRef } from 'react';
import { BasicInfoChangeDiv, BasicInfoInput } from '../Styles/Styles';
import { getBasicInfo } from '../Services/Getters';
import { BasicInfoProps } from '../Interfaces/Interfaces';
import { useParams } from 'react-router-dom';

export const useInput = (initialValue = '', id: keyof BasicInfoProps, onValueChange: (id: keyof BasicInfoProps, value: string) => void) => {

  const [isInputVisible, setInputVisible] = useState(false);
  const [value, setValue] = useState<string | undefined>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { userId } = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onValueChange(id, e.target.value);
  };

  useEffect(() => {
    const fetchInitialValue = async () => {
      if (!userId) return;
      const data = await getBasicInfo(userId);
      if (data && id in data) {
        setValue(data[id]);
      }
    }

    fetchInitialValue();
  }, [id]);

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const handleBlur = () => setInputVisible(false);
  const handleClick = () => setInputVisible(true);

  const InputComponent = isInputVisible ? (
    <BasicInfoInput
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={`Enter ${id}`}
      onBlur={handleBlur}
    />
  ) : (
    <BasicInfoChangeDiv onClick={handleClick} id={id}>
      {id.charAt(0).toUpperCase() + id.slice(1)}: <br />
      {value}
    </BasicInfoChangeDiv>
  );

  return [value, InputComponent];
};