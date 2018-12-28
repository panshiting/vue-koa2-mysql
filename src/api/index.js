import request from '@/api/request'
import {Message} from 'element-ui'

const handleSuccess = (resolve, reject, respHeader, respBody) => {
  if (respHeader.resultCode === 0) {
    resolve(respBody || respHeader.message)
  } else {
    Message.error(respHeader.message)
    reject(respHeader.message)
  }
}

const handleError = (reject, e) => {
  Message.error('系统繁忙，请稍后再试！')
  reject(e)
}

/**
 * get请求方法
 * @param url
 * @returns {Promise<any>}
 */
export function get (url) {
  return new Promise(async (resolve, reject) => {
    try {
      const {respHeader, respBody} = await request.get(url)
      handleSuccess(resolve, reject, respHeader, respBody)
    } catch (e) {
      handleError(reject, e)
    }
  })
}

/**
 * post请求方法
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function post (url, params = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const {respHeader, respBody} = await request.post(url, {reqBody: params})
      handleSuccess(resolve, reject, respHeader, respBody)
    } catch (e) {
      handleError(reject, e)
    }
  })
}

/**
 * put请求方法
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function put (url, params = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const {respHeader, respBody} = await request.put(url, {reqBody: params})
      handleSuccess(resolve, reject, respHeader, respBody)
    } catch (e) {
      handleError(reject, e)
    }
  })
}

/**
 * delete请求方法
 * @param url
 * @returns {Promise<any>}
 */
export function del (url) {
  return new Promise(async (resolve, reject) => {
    try {
      const {respHeader, respBody} = await request.delete(url)
      handleSuccess(resolve, reject, respHeader, respBody)
    } catch (e) {
      handleError(reject, e)
    }
  })
}

/**
 * 批量delete请求方法
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function batchDel (url, params = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const {respHeader, respBody} = await request.delete(url, {
        data: {reqBody: params}
      })
      handleSuccess(resolve, reject, respHeader, respBody)
    } catch (e) {
      handleError(reject, e)
    }
  })
}

/**
 * 上传方法
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function upload (url, params = {}) {
  const formData = new FormData()
  for (let i in params) {
    formData.append(i, params[i])
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await request.post(url, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      resolve(res)
    } catch (e) {
      handleError(reject, e)
    }
  })
}

/**
 * 下载方法
 */
export function download (url) {
  return new Promise(async (resolve, reject) => {
    try {
      await request.get(url)
      let iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = url
      iframe.onload = function () {
        document.body.removeChild(iframe)
      }
      document.body.appendChild(iframe)
    } catch (e) {
      handleError(reject, e)
    }
  })
}
