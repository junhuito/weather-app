import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { TextInput } from 'react-native';

type SearchBarProps = {
  onSubmit?: (value?: string) => void;
  value?: string;
};

export const SearchBar = ({ onSubmit, value }: SearchBarProps) => {
  const [_value, setValue] = useState(value);

  return (
    <LinearGradient
      className="py-2 px-4 rounded-2xl space-x-1 flex-row items-center"
      colors={['#2E335A', '#1C1B33']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Ionicons name="search" color="white" size={25} />
      <TextInput
        className="p-2 flex-grow text-white placeholder:text-white text-lg"
        value={_value}
        placeholderTextColor="white"
        placeholder="Search for a city"
        onSubmitEditing={() => onSubmit && onSubmit(_value)}
        onChangeText={setValue}
      />
    </LinearGradient>
  );
};
