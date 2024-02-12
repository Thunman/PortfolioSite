import { useEffect, useState } from 'react';
import { BasicInfoDiv, BasicInfoInput } from '../Styles/Styles';
import { getBasicInfo } from '../Services/Getters';
import { BasicInfoProps } from '../Interfaces/Interfaces';

export const useInput = (initialValue = '', id: keyof BasicInfoProps, onValueChange: (id: keyof BasicInfoProps, value: string) => void) => {

    const [isInputVisible, setInputVisible] = useState(false);
    const [value, setValue] = useState<string | undefined>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onValueChange(id, e.target.value);
      };
    useEffect(() => {
        const fetchInitialValue = async () => {
          const data = await getBasicInfo();
          if (data && id in data) {
            setValue(data[id]);
          }
        }
      
        fetchInitialValue();
      }, [id]);
    const handleBlur = () => setInputVisible(false);
    const handleClick = () => setInputVisible(true);
    
  
    const InputComponent = isInputVisible ? (
      <BasicInfoInput
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={`Enter ${id}`}
        onBlur={handleBlur}
      />
    ) : (
      <BasicInfoDiv onClick={handleClick} id={id}>
        {id.charAt(0).toUpperCase() + id.slice(1)}: <br />
        {value}
      </BasicInfoDiv>
    );
  
    return [value, InputComponent];
  }