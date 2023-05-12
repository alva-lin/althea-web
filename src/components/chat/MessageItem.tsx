import { MonitorOutlined, PersonOutlined } from "@mui/icons-material";
import { MessageInfo, MessageType } from "../../services/chat/models";
import Markdown from "./Markdown";

export interface MessageItemProp {
  message: MessageInfo;
  index: number;
}

const MessageItem = ({ message, index }: MessageItemProp) => {
  const avatar =
    message.type === MessageType.User ? (
      <PersonOutlined />
    ) : (
      <MonitorOutlined />
    );

  return (
    <div
      className={
        "group w-full text-gray-800 justify-center items-center gap-1 border-b border-black/10" +
        (index % 2 ? " bg-gray-100 " : "")
      }
    >
      <div
        className={
          "flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto"
        }
      >
        <div className="flex-shrink-0 flex flex-col relative items-end">
          <div className="w-[30px]">
            <div className="relative flex">{avatar}</div>
          </div>
          <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible hidden">
            <div>left button</div>
            <span className="flex-grow flex-shrink-0">1 / 1</span>
            <div>right button</div>
          </div>
        </div>
        <div className="relative flex flex-col w-[calc(100%-50px)] lg:w-[calc(100%-115px)] gap-1 md:gap-3">
          <div className="flex-grow flex flex-col gap-3">
            <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
              <Markdown content={message.content} />
            </div>
          </div>
          <div className="flex justify-between lg:block">
            <div className="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 hidden">
              操作区
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
