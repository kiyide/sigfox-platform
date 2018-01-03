/* tslint:disable */

declare var Object: any;
export interface AlertInterface {
  "connectorId": string;
  "key": string;
  "value_min"?: number;
  "value_max"?: number;
  "value_exact"?: any;
  "message"?: string;
  "id"?: number;
}

export class Alert implements AlertInterface {
  "connectorId": string = '';
  "key": string = '';
  "value_min": number = 0;
  "value_max": number = 0;
  "value_exact": any = <any>null;
  "message": string = '';
  "id": number = 0;
  constructor(data?: AlertInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Alert`.
   */
  public static getModelName() {
    return "Alert";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Alert for dynamic purposes.
  **/
  public static factory(data: AlertInterface): Alert{
    return new Alert(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Alert',
      plural: 'Alerts',
      path: 'Alerts',
      idName: 'id',
      properties: {
        "connectorId": {
          name: 'connectorId',
          type: 'string'
        },
        "key": {
          name: 'key',
          type: 'string'
        },
        "value_min": {
          name: 'value_min',
          type: 'number'
        },
        "value_max": {
          name: 'value_max',
          type: 'number'
        },
        "value_exact": {
          name: 'value_exact',
          type: 'any'
        },
        "message": {
          name: 'message',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}