import request from '@/utils/request'
import {TypeCheck} from "@/app/typeCheck";

const defaultCurrentPage = 1;
const defaultPageSize = 10;

export const CodeCategory = {
  nft: 'nft',
  token: 'token',
  other: 'other',
}

export const CodeType = {
  interface: 'interface',
  contract: 'contract',
  transaction: 'transaction',
}

// 代码搜索
export function searchCode(params) {
  const requestUrl = '/search';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return TypeCheck.isNotObject(params) || (Object.keys(params).length <= 0) ||
        TypeCheck.isNotString(params.keywords) || (params.keywords === '');
  }
  const generateRequestParams = (params) => {
    const queryParams = {};
    queryParams.query = params.keywords;
    queryParams.code_category = TypeCheck.isString(params.codeCategory) ? params.codeCategory : '';
    queryParams.code_type = TypeCheck.isString(params.codeType) ? params.codeType : '';
    queryParams.page_num = (TypeCheck.isNumber(params.currentPage) && (params.currentPage > 0)) ? params.currentPage : defaultCurrentPage;
    queryParams.page_size = (TypeCheck.isNumber(params.pageSize) && (params.pageSize > 0)) ? params.pageSize : defaultPageSize;
    return {
      query: params.keywords,
      contract_category: TypeCheck.isString(params.codeCategory) ? params.codeCategory : '',
      contract_type: TypeCheck.isString(params.codeType) ? params.codeType : '',
      page_num: (TypeCheck.isNumber(params.currentPage) && (params.currentPage > 0)) ? params.currentPage : defaultCurrentPage,
      page_size: (TypeCheck.isNumber(params.pageSize) && (params.pageSize > 0)) ? params.pageSize : defaultPageSize,
    };
  }
  const responseIsInvalid = (response) => {
    return TypeCheck.isNotObject(response) || (Object.keys(response).length <= 0) ||
        TypeCheck.isNotArray(response.results) || TypeCheck.isNotNumber(response.num);
  }
  const generateResult = (response) => {
    const result = {
      count: response.num,
      searchTime: response.took_time ?? 0,
      data: [],
    };
    response.results.forEach((item, index) => {
      result.data.push({
        rowID: index + params.pageSize * (params.currentPage - 1),
        id: item.id,
        contractName: item.contract_name,
        contractAddress: item.contract_address,
        contractCode: item.contract_code,
        contractType: item.contract_type,
        score: item._score,
        url: item.url,
        isProcess: item.is_process,
        callInLastMonth: item.call_in_month ?? 0,
      });
    });
    return result;
  }
  return new Promise((resolve, reject) => {
    if (paramsIsInvalid(params)) {
      return reject({error: "Parameter is invalid!"});
    }
    request({
      url: requestUrl,
      method: requestMethod,
      params: generateRequestParams(params),
    }).then(response => {
      if (responseIsInvalid(response)) {
        return reject({error: "Response is invalid!"});
      }
      resolve(generateResult(response));
    }).catch((error) => {
      reject(error);
    });
  });
}
