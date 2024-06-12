import { Text } from 'react-native';
import formatDate from 'intl-dateformat';
import { useEffect, useRef, useState } from 'react';

export const DateTime = ({ offset, fontSize = 16 }: { offset: number; fontSize?: number }) => {
  const [date, setDate] = useState(Date.now() + offset);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  useEffect(() => {
    clearInterval(ref.current);

    ref.current = setInterval(() => {
      setDate(Date.now() + offset);
    }, 1000);

    return () => clearInterval(ref.current);
  }, [offset, setDate]);
  
  return (
    <Text className="text-gray-400" style={{ fontSize }}>
      {formatDate(new Date(date), 'ddd DD MMM HH:mm')}
    </Text>
  );
};
