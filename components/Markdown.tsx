import ReactMarkdown from 'react-markdown';

export const Markdown = (props: { source: string }) => (
  <ReactMarkdown source={props.source} />
);
