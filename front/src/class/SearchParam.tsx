export class SearchParam {
  private _area: string | undefined;
  private _style: string[] | undefined;
  private _month: string | undefined;
  private _minPoint: number | undefined;
  private _maxPoint: number | undefined;

  constructor(
    area?: string | undefined,
    style?: string[] | undefined,
    month?: string | undefined,
    minPoint?: number | undefined,
    maxPoint?: number | undefined
  ) {
    this._area = area;
    this._style = style;
    this._month = month;
    this._minPoint = minPoint;
    this._maxPoint = maxPoint;
  }

  get area(): string | undefined {
    return this._area;
  }

  set area(value: string | undefined) {
    this._area = value;
  }

  get style(): string[] | undefined {
    return this._style;
  }

  set style(value: string[] | undefined) {
    this._style = value;
  }

  get month(): string | undefined {
    return this._month;
  }

  set month(value: string | undefined) {
    this._month = value;
  }

  get minPoint(): number | undefined {
    return this._minPoint;
  }

  set minPoint(value: number | undefined) {
    this._minPoint = value;
  }

  get maxPoint(): number | undefined {
    return this._maxPoint;
  }

  set maxPoint(value: number | undefined) {
    this._maxPoint = value;
  }

  public makeQuery(): string {
    let queries = [];
    if (this._area) {
      queries.push(`area=${this._area}`);
    }
    // 空白でない配列
    if (this._style && this._style.filter((style) => style).length > 0) {
      queries.push(this._style.map((style) => 'style=' + style).join('&'));
    }
    if (this._month) {
      queries.push(`month=${this._month}`);
    }
    if (this._minPoint) {
      queries.push(`minPoint=${this._minPoint}`);
    }
    if (this._maxPoint) {
      queries.push(`maxPoint=${this._maxPoint}`);
    }
    return '?' + queries.join('&');
  }
}
