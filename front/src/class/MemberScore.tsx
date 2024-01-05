const Pref = {
  Tokyo: '東京',
  Chiba: '千葉',
  Kanagawa: '神奈川',
};

type PrefKey = keyof typeof Pref;
type PrefValue = (typeof Pref)[PrefKey];

const Style = {
  Permanent: '正社員',
  Temporary: 'アルバイト',
};

type StyleKey = keyof typeof Style;
type StyleValue = (typeof Style)[StyleKey];

export type MemberScore = {
  _id: string;
  name: string;
  area: string;
  style: string;
  point: number;
  month: Date;
};
