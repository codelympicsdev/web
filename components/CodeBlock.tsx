import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import lightTheme from 'prism-react-renderer/themes/github';
import darkTheme from 'prism-react-renderer/themes/dracula';
import {
  useColorMode,
  Box,
  Button,
  ButtonProps,
  useClipboard,
} from '@chakra-ui/core';

const highlightStyle = {
  padding: 20,
  fontSize: 14,
  overflow: 'auto',
  lineHeight: '1.5',
  fontFamily: 'Menlo,monospace',
};

export const CodeBlock = (props: {
  source: string;
  language?: Language;
  prefix?: string;
  hasCopy?: boolean;
}) => {
  const { colorMode } = useColorMode();
  const { hasCopied, onCopy } = useClipboard(props.source);

  const themes = { light: lightTheme, dark: darkTheme };
  const theme = themes[colorMode];

  return (
    <Box position='relative' borderRadius={15} overflow='hidden'>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={(props.prefix || '') + props.source}
        language={props.language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, ...highlightStyle }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {props.hasCopy ? (
        <CopyButton top='18px' onClick={onCopy}>
          {hasCopied ? 'copied' : 'copy'}
        </CopyButton>
      ) : null}
    </Box>
  );
};

const CopyButton = (props: ButtonProps) => (
  <Button
    size='sm'
    position='absolute'
    textTransform='uppercase'
    variantColor='blue'
    fontSize='xs'
    height='24px'
    top={0}
    zIndex={1}
    right='1.25em'
    {...props}
  />
);
