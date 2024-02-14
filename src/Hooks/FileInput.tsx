import { useState } from "react";

export const useFileInput = (initialValue: File | null, name: string) => {
    const [value, setValue] = useState(initialValue);
    const input = (
      <input
        type="file"
        name={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) {
            setValue(event.target.files[0]);
          }
        }}
      />
    );
    return [value, input];
  };