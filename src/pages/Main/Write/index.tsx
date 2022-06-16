import React, {
  ChangeEvent,
  useCallback,
  useState,
  KeyboardEvent,
  MouseEvent,
  useRef,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useInput from 'hooks/useInput';
import './styles.css';
import Tooltip from 'components/Tooltip';
import Tag from 'components/Tag';

const Write = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, , changeTitle] = useInput();
  const [tag, setTag, changeTag] = useInput();
  const [tagList, setTagList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [areaCursor, setAreaCursor] = useState<number>();
  const [content, setContent] =
    useState(`A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `);

  const handleTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [content]
  );

  const toggleInfoModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleTagChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTag(e.target.value.replace(',', ''));
    },
    [tag, tagList]
  );

  const handleTagKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const { code } = e;
      if (code === 'Enter' || code === 'Comma') {
        if (!tagList.some(_tag => _tag === tag)) {
          setTagList([...tagList, tag]);
        }
        setTag('');
      }
    },
    [tag, tagList]
  );

  const handleTag = useCallback(
    (selectedIndex: number) => {
      setTagList(tagList.filter((tag, index) => index !== selectedIndex));
    },
    [tag, tagList]
  );

  const handleAreaKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      console.log(e);
    },
    [content]
  );

  const handleHeading = useCallback(
    (headingNum: number) => {
      // headingNum 만큼 # 추가해서 content에 추가하기.
      const headingCount = Array(headingNum).fill('#').join('');

      const { current } = textAreaRef;

      // 1. cursor 위치를 인위적으로 바꾸지 않는 이상 cursor 위치 유지하기.
      const currentLine =
        content.lastIndexOf('\n', areaCursor || current?.selectionStart) + 1;

      const pre = content.slice(0, currentLine);
      const suf = content.slice(currentLine, content.length);

      setContent(`${pre}${headingCount} ${suf.replaceAll(/^(#* )/g, '')}`);
    },
    [areaCursor, textAreaRef]
  );

  const handleAreaClick = useCallback(() => {
    setAreaCursor(textAreaRef.current?.selectionStart);
  }, [areaCursor]);

  return (
    <div className="write-page">
      <div className="write-wrapper">
        <div className="input-wrapper title-input">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            onChange={changeTitle}
          />
        </div>
        <div className="input-wrapper tag-wrapper">
          {tagList.map((tag, index) => (
            <Tag
              key={`${tag}${index}`}
              tag={tag}
              index={index}
              onTag={handleTag}
            />
          ))}
          <input
            type="text"
            value={tag}
            placeholder="태그를 입력하세요"
            onChange={handleTagChange}
            onKeyDown={handleTagKeyDown}
            onFocus={toggleInfoModal}
            onBlur={toggleInfoModal}
          />
          <Tooltip isOpen={isOpen}>
            쉼표 혹은 엔터를 입력하여 태그를 등록할 수 있습니다. <br />
            등록된 태그를 클릭하면 삭제됩니다.
          </Tooltip>
        </div>

        <div className="input-wrapper toolbar">
          {Array(4)
            .fill('')
            .map((row, index) => {
              const headingNum = index + 1;
              return (
                <button key={index} onClick={() => handleHeading(headingNum)}>
                  <div>
                    H<span>{index + 1}</span>
                  </div>
                </button>
              );
            })}
          <div className="division" />
          <button>B</button>
          <button>I</button>
        </div>
        <textarea
          ref={textAreaRef}
          value={content}
          className="content-area"
          onKeyDown={handleAreaKeyDown}
          onChange={handleTextArea}
          onClick={handleAreaClick}
        />
      </div>
      <div className="preview-wrapper">
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
};

export default Write;
