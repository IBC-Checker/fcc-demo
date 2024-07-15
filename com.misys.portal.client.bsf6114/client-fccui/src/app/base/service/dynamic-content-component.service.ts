import { Injectable } from '@angular/core';
import { DynamicContentComponentService, Mapping } from 'fccui';
import { ClientMapping } from '../model/client-mapping';
@Injectable({
  providedIn: 'root'
})
export class DynamicContentClientComponentService extends DynamicContentComponentService {
  UnknownDynamicComponent = 'UnknownDynamicComponent';
  constructor() {
    super();
  }
  getComponentType(typeName: string) {
    const type = ClientMapping.mappings[typeName] !== undefined ?ClientMapping.mappings[typeName] : Mapping.mappings[typeName] ; /***This will take mapping from client mappings if present else from the core mapping file***/
 
    return type || this.UnknownDynamicComponent;
}
}