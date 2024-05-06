import Markdown from 'react-markdown';


const MarkdownComponent = ({ content }) => {
    return (
        <Markdown>{content}</Markdown>
    );
};

export default MarkdownComponent;
