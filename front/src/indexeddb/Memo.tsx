import Dexie from 'dexie';
import { MemoRecord } from '../class/MemoRecord';

const database = new Dexie('markdown-editor');
// テーブル定義
database.version(1).stores({ memos: '&datetime' });
const memos: Dexie.Table<MemoRecord, string> = database.table('memos');

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString();
  // putはupsert
  await memos.put({ datetime, title, text });
};

export const getMemos = async (): Promise<MemoRecord[]> => {
  return memos.toArray();
};
