import { TextProps, Text } from 'react-native';

const Span = ({ className, children, ...rest }: TextProps) => (
  <Text className={`w-min font-mulish text-base dark:text-white ${className}`} {...rest}>
    {children}
  </Text>
);

const H1 = ({ className, children, ...rest }: TextProps) => (
  <Text className={`font-mulish text-3xl font-semibold dark:text-white ${className}`} {...rest}>
    {children}
  </Text>
);

const H2 = ({ className, children, ...rest }: TextProps) => (
  <Text className={`w-fit font-mulish text-2xl font-medium dark:text-white ${className}`} {...rest}>
    {children}
  </Text>
);

const H3 = ({ className, children, ...rest }: TextProps) => (
  <Text className={`w-fit font-mulish text-xl font-medium dark:text-white ${className}`} {...rest}>
    {children}
  </Text>
);

export default {
  Span,
  H1,
  H2,
  H3,
};
