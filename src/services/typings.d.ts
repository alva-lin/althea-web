declare namespace API {
  // 接口请求配置
  type RequestOptions = { [key: string]: any };
  
  // 接口返回体
  type Response<T> = {
    // 返回值代码
    code: number;
    // 返回值
    data: T | null;
    // 消息
    message: string;
    // 错误消息
    errorMessage: string;
  };
  
  // 接口空返回体
  type ResponseEmpty = Response<Record<string, never>>;
  
  // 执行结果返回提
  type ResponseResult = Response<boolean>;
  
  // 接口列表数据返回体
  type ResponseList<T> = Response<T[]> & { totalCount: number };
}
