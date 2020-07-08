/* tslint:disable */
import { FileClass } from './file-class';
export interface File {
  class: FileClass;
  class_id?: string;
  extension: string;
  id: string;
  name: string;
  size: number;
  url: string;
}
