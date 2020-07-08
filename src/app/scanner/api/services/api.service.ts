/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FileClass } from '../models/file-class';
import { FileList } from '../models/file-list';
import { FileUpdateParams } from '../models/file-update-params';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getFileList
   */
  static readonly GetFileListPath = '/files';

  /**
   * GetFileList.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFileList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileList$Response(params?: {
    limit?: number;
    offset?: number;
    iDs?: Array<string>;

  }): Observable<StrictHttpResponse<FileList>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetFileListPath, 'get');
    if (params) {

      rb.query('limit', params.limit);
      rb.query('offset', params.offset);
      rb.query('IDs', params.iDs);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileList>;
      })
    );
  }

  /**
   * GetFileList.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFileList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileList(params?: {
    limit?: number;
    offset?: number;
    iDs?: Array<string>;

  }): Observable<FileList> {

    return this.getFileList$Response(params).pipe(
      map((r: StrictHttpResponse<FileList>) => r.body as FileList)
    );
  }

  /**
   * Path part for operation updateFile
   */
  static readonly UpdateFilePath = '/files/{id}';

  /**
   * UpdateFile.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFile$Response(params: {
    id: string;
      body?: FileUpdateParams
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.UpdateFilePath, 'put');
    if (params) {

      rb.path('id', params.id);

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * UpdateFile.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateFile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFile(params: {
    id: string;
      body?: FileUpdateParams
  }): Observable<void> {

    return this.updateFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation upload
   */
  static readonly UploadPath = '/files/upload';

  /**
   * Upload scanned document.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `upload()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  upload$Response(params?: {
      body?: { 'name': string, 'files': Array<Blob> }
  }): Observable<StrictHttpResponse<FileList>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.UploadPath, 'post');
    if (params) {


      rb.body(params.body, 'multipart/form-data');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileList>;
      })
    );
  }

  /**
   * Upload scanned document.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `upload$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  upload(params?: {
      body?: { 'name': string, 'files': Array<Blob> }
  }): Observable<FileList> {

    return this.upload$Response(params).pipe(
      map((r: StrictHttpResponse<FileList>) => r.body as FileList)
    );
  }

  /**
   * Path part for operation getFileClasses
   */
  static readonly GetFileClassesPath = '/classes';

  /**
   * Get All.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFileClasses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileClasses$Response(params?: {

  }): Observable<StrictHttpResponse<Array<FileClass>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetFileClassesPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FileClass>>;
      })
    );
  }

  /**
   * Get All.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFileClasses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileClasses(params?: {

  }): Observable<Array<FileClass>> {

    return this.getFileClasses$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FileClass>>) => r.body as Array<FileClass>)
    );
  }

  /**
   * Path part for operation createFileClass
   */
  static readonly CreateFileClassPath = '/classes';

  /**
   * Create File Class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFileClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFileClass$Response(params?: {
      body?: FileClass
  }): Observable<StrictHttpResponse<Array<FileClass>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.CreateFileClassPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FileClass>>;
      })
    );
  }

  /**
   * Create File Class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createFileClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createFileClass(params?: {
      body?: FileClass
  }): Observable<Array<FileClass>> {

    return this.createFileClass$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FileClass>>) => r.body as Array<FileClass>)
    );
  }

  /**
   * Path part for operation updateFileClass
   */
  static readonly UpdateFileClassPath = '/classes/{id}';

  /**
   * Update File Class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFileClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFileClass$Response(params: {
    id: string;
      body?: FileClass
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.UpdateFileClassPath, 'put');
    if (params) {

      rb.path('id', params.id);

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Update File Class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateFileClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFileClass(params: {
    id: string;
      body?: FileClass
  }): Observable<void> {

    return this.updateFileClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteFileClass
   */
  static readonly DeleteFileClassPath = '/classes/{id}';

  /**
   * Delete File Class.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFileClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFileClass$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteFileClassPath, 'delete');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete File Class.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteFileClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFileClass(params: {
    id: string;

  }): Observable<void> {

    return this.deleteFileClass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
