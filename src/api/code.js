import request from '@/utils/request'
import {TypeCheck} from "@/app/typeCheck";

// 获得代码内容
export function getCode(params) {
  const requestUrl = '/code';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return (TypeCheck.isObject(params) === false) || (Object.keys(params).length <= 0) ||
        (TypeCheck.isString(params.contractName) === false) || (params.contractName === '') ||
        (TypeCheck.isString(params.contractAddress) === false) || (params.contractAddress === '');
  }
  const generateRequestParams = (params) => {
    return {
      contract_name: params.contractName,
      contract_address: params.contractAddress,
    }
  }
  const responseIsInvalid = (response) => {
    return (TypeCheck.isObject(response) === false) || (Object.keys(response).length <= 0) ||
        (TypeCheck.isString(response.contract_code) === false);
  }
  const generateResult = (response) => {
    return {
      code: response.contract_code,
    }
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

// 获得代码结构
export function getCodeStructure(params) {
  const requestUrl = '/code_structure';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return TypeCheck.isNotObject(params) || (Object.keys(params).length <= 0) ||
        TypeCheck.isNotString(params.contractName) || (params.contractName === '') ||
        TypeCheck.isNotString(params.contractAddress) || (params.contractAddress === '');
  }
  const generateRequestParams = (params) => {
    return {
      contract_name: params.contractName,
      contract_address: params.contractAddress,
    }
  }
  const responseIsInvalid = (response) => {
    return TypeCheck.isNotObject(response) || (Object.keys(response).length <= 0) ||
        TypeCheck.isNotArray(response.data);
  }
  const generateResult = (response) => {
    const result = [];
    response.data.forEach(value => {
      result.push({
        id: value.id,
        type: value.struct_type,
        name: value.struct_name,
        startPosition: value.start_pos,
        endPosition: value.end_pos,
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

// 获得代码相关合约
export function getRelatedContracts(params) {
  const requestUrl = '/contracts';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return (TypeCheck.isObject(params) === false) || (Object.keys(params).length <= 0) ||
        (TypeCheck.isString(params.contractName) === false) || (params.contractName === '') ||
        (TypeCheck.isString(params.contractAddress) === false) || (params.contractAddress === '');
  }
  const generateRequestParams = (params) => {
    return {
      contract_name: params.contractName,
      contract_address: params.contractAddress,
    }
  }
  const responseIsInvalid = (response) => {
    return (TypeCheck.isObject(response) === false) || (Object.keys(response).length <= 0) ||
        (TypeCheck.isArray(response.data) === false);
  }
  const generateResult = (response) => {
    const result = [];
    response.data.forEach(value => {
      result.push({
        name: value.related_contract_name,
        address: value.related_contract_address,
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

// 获得代码相关脚本
export function getRelatedScripts(params) {
  return request({
    url: '/scripts',
    method: 'get',
    params: params
  })
}

// 获得代码相关交易代码
export function getRelatedTransactions(params) {
  const requestUrl = '/transactions';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return (TypeCheck.isObject(params) === false) || (Object.keys(params).length <= 0) ||
        (TypeCheck.isString(params.contractName) === false) || (params.contractName === '') ||
        (TypeCheck.isString(params.contractAddress) === false) || (params.contractAddress === '');
  }
  const generateRequestParams = (params) => {
    return {
      contract_name: params.contractName,
      contract_address: params.contractAddress,
    }
  }
  const responseIsInvalid = (response) => {
    return TypeCheck.isNotObject(response) || (Object.keys(response).length <= 0) ||
        TypeCheck.isNotArray(response.data);
  }
  const generateResult = (response) => {
    const result = [];
    response.data.forEach(value => {
      result.push({
        name: value.relate_transaction_name,
        address: value.relate_transaction_address,
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

// 获得代码相关属性
export function getCodeInfo(params) {
  const requestUrl = '/code_info';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return (TypeCheck.isObject(params) === false) || (Object.keys(params).length <= 0) ||
        (TypeCheck.isString(params.contractName) === false) || (params.contractName === '') ||
        (TypeCheck.isString(params.contractAddress) === false) || (params.contractAddress === '');
  }
  const generateRequestParams = (params) => {
    return {
      contract_name: params.contractName,
      contract_address: params.contractAddress,
    }
  }
  const responseIsInvalid = (response) => {
    return TypeCheck.isNotObject(response) || (Object.keys(response).length <= 0) ||
        TypeCheck.isNotString(response.contract_type) ||
        // TypeCheck.isNotString(response.contract_category) ||
        TypeCheck.isNotNumber(response.call_in_month);
  }
  const generateResult = (response) => {
    return {
      contractType: response.contract_type ?? '',
      contractCategory: response.contract_category ?? '',
      callInLastMonth: response.call_in_month ?? 0,
    }
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

// 获得相似代码
export function getSimilarCode(params) {
  const requestUrl = '/similar';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return TypeCheck.isNotObject(params) || (Object.keys(params).length <= 0) ||
        TypeCheck.isNotString(params.contractName) || (params.contractName === '') ||
        TypeCheck.isNotString(params.contractAddress) || (params.contractAddress === '');
  }
  const generateRequestParams = (params) => {
    return {
      contract_name: params.contractName,
      contract_address: params.contractAddress,
    }
  }
  const responseIsInvalid = (response) => {
    return TypeCheck.isNotObject(response) || (Object.keys(response).length <= 0) ||
        TypeCheck.isNotObject(response.results) || TypeCheck.isNotArray(response.results.data);
  }
  const generateResult = (response) => {
    const result = [];
    response.results.data.forEach(value => {
      result.push({
        id: value._source.id,
        contractName: value._source.contract_name,
        contractAddress: value._source.contract_address,
        contractCode: value._source.contract_code,
        contractType: value._source.contract_type,
        callInLastMonth: value._source.call_in_month ?? 0,
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

// 获得代码playgroud链接
export function getCodePlayground(params) {
  const requestUrl = '/playground';
  const requestMethod = 'get';
  const paramsIsInvalid = (params) => {
    return TypeCheck.isNotObject(params) || (Object.keys(params).length <= 0) ||
        TypeCheck.isNotString(params.contractName) || (params.contractName === '') ||
        TypeCheck.isNotString(params.contractAddress) || (params.contractAddress === '');
  }
  const generateRequestParams = (params) => {
    return {
      contract_name: params.contractName,
      contract_address: params.contractAddress,
    }
  }
  const responseIsInvalid = (response) => {
    return TypeCheck.isNotObject(response) || (Object.keys(response).length <= 0) ||
        TypeCheck.isNotString(response.playground_url);
  }
  const generateResult = (response) => {
    return {
      playgroundUrl: response.playground_url,
    }
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
