export class LocationClass {
  private _id: string;
  private _prefCode: string | undefined;
  private _townCode: string | undefined;

  constructor(id: string, prefCode?: string | undefined, townCode?: string | undefined) {
    this._id = id;
    this._prefCode = prefCode;
    this._townCode = townCode;
  }

  get id(): string {
    return this._id;
  }

  get prefCode(): string | undefined {
    return this._prefCode;
  }

  set prefCode(prefCode: string | undefined) {
    this._prefCode = prefCode;
  }

  get townCode(): string | undefined {
    return this._townCode;
  }

  set townCode(townCode: string | undefined) {
    this._townCode = townCode;
  }
}
