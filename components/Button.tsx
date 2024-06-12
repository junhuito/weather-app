import React from 'react';
import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from 'react-native';
import classNames from 'classnames';

const ButtonTheme = {
  primary: 'amber',
  secondary: 'sky',
  danger: 'red',
};

export type ButtonProps = {
  title: string;
  theme?: keyof typeof ButtonTheme;
  rounded?: boolean;
  loading?: boolean;
} & PressableProps;

export const Button = ({
  title,
  theme = 'primary',
  rounded,
  loading = false,
  ...buttonProps
}: ButtonProps) => {
  const buttonTheme = ButtonTheme[theme];
  return (
    <Pressable {...buttonProps}>
      <Text
        className={classNames({
          ['rounded-md']: rounded,
          ['m-auto']: true,
          [`text-center dark:text-white`]: true,
          [`p-2`]: true,
          ['font-bold']: true,
          [`bg-${buttonTheme}-400`]: true,
          ['w-full']: true,
          ['text-lg']: true,
          ['bg-gray-400']: buttonProps.disabled,
        })}
      >
        {loading ? <ActivityIndicator size="small" color="#FFF" /> : title}
      </Text>
    </Pressable>
  );
};
