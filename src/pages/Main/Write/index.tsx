import React, { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useInput from 'hooks/useInput';
import './styles.css';

const Write = () => {
  const [title, , changeTitle] = useInput();
  const [tag, , changeTag] = useInput();
  const [isOpen, setIsOpen] = useState(false);
  const [content, changeConent] =
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
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      changeConent(e.target.value);
    },
    [content]
  );

  const toggleInfoModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

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
        <div className="input-wrapper tag-input">
          <input
            type="text"
            placeholder="태그를 입력하세요"
            onChange={changeTag}
            onFocus={toggleInfoModal}
            onBlur={toggleInfoModal}
          />
          <div className={`info-modal ${isOpen ? 'on' : ''}`}>
            쉼표 혹은 엔터를 입력하여 태그를 등록할 수 있습니다. <br />
            등록된 태그를 클릭하면 삭제됩니다.
          </div>
        </div>
        <div className="input-wrapper style-btn-wrapper">
          <button>
            <div>
              H<span>1</span>
            </div>
          </button>
          <button>
            <div>
              H<span>2</span>
            </div>
          </button>
          <button>
            <div>
              H<span>3</span>
            </div>
          </button>
          <button>
            <div>
              H<span>4</span>
            </div>
          </button>
          <div className="division" />
          <button>B</button>
          <button>I</button>
        </div>
        <textarea className="content-area" onChange={handleTextArea} />
      </div>
      <div className="preview-wrapper">
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
};

export default Write;
