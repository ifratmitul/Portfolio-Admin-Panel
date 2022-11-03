
export interface IDataTableSettings {
  colum: ColumDetails[]
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
  canView: boolean;
  createButtonLabel: string;
}


export class DataTableSettings implements IDataTableSettings {
  colum: ColumDetails[] = [];
  canEdit: boolean = false;
  canDelete: boolean = false;
  canCreate: boolean = false;
  canView: boolean = false;
  createButtonLabel: string = "Create";
}


class ColumDetails {
  field: string = "";
  header: string = "";
  isImage: boolean = false;
}
