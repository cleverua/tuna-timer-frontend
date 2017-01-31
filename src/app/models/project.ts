

export class Project {
  public ext_id: string;
  public name: string;
  public id: string;
  public color: number;

  constructor(data: any) {
    for (var key in data) {
      this[key] = data[key]
    }
  }
  // constructor( ext_id, ext_name, id) {
  //   this.ext_id = ext_id;
  //   this.name = ext_name;
  //   this.id = id;
  // }
}

