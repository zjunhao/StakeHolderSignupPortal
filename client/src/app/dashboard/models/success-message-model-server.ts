/** 
 * Model for server response coming in in format of {success: true/false, message: "something succeed"}
 */
export class ServerSuccessMessageModel {
   success: boolean;
   message: string;
}