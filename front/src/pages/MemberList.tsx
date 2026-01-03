import { FC, useEffect, useState } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import { Member } from '../class/Member';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 100%;
`;

// 擬似APIレスポンスの型定義
interface ApiResponse {
  success: boolean;
  data: Member[];
  message?: string;
}

// 擬似API: setTimeoutを使ってMemberデータを返す
const fetchMembersFromFakeApi = (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    // 1.5秒後にデータを返す
    setTimeout(() => {
      const mockMembers: Member[] = [
        {
          member_id: 'M001',
          name: '山田太郎',
          score: 85,
          status: 'active',
        },
        {
          member_id: 'M002',
          name: '佐藤花子',
          score: 92,
          status: 'active',
        },
        {
          member_id: 'M003',
          name: '鈴木一郎',
          score: 78,
          status: 'inactive',
        },
        {
          member_id: 'M004',
          name: '田中美咲',
          score: 88,
          status: 'active',
        },
        {
          member_id: 'M005',
          name: '高橋健太',
          score: 95,
          status: 'active',
        },
      ];

      resolve({
        success: true,
        data: mockMembers,
        message: 'メンバー情報を取得しました',
      });
    }, 1500);
  });
};

export const MemberList: FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [searchScore, setSearchScore] = useState<string>('');
  const [searchActive, setSearchActive] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  // フィルタリング処理
  const filteredMembers = members.filter((member: Member) => {
    // 1. 名前検索: 大文字小文字を区別しない（Case-insensitive）
    const matchesName = member.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    // 2. スコア検索: 数値に変換した値を保持して比較
    const targetScore = searchScore !== '' ? Number(searchScore) : null;
    // ||（論理和演算子）は、左側の値が「偽」と評価される場合に右側の値を返すという特徴があります。
    // ここで使われている「targetScore === null || (!isNaN(targetScore) && member.score >= targetScore)」の例の場合、
    // まず「targetScore === null」を評価し、これがtrue（=検索条件が未入力のとき）であれば、その時点でtrueとなり
    // 以降は評価されません。
    // 逆にfalse（=targetScoreがnull以外＝検索スコアが入力済み）であれば、右側「(!isNaN(targetScore) && member.score >= targetScore)」が評価されます。
    // つまり、「検索スコアが未入力なら常にマッチ」、「入力済みの場合はmember.scoreがその値以上のときマッチ」、という絞り込み判定になります。
    const matchesScore =
      targetScore === null || 
      (!isNaN(targetScore) && member.score >= targetScore);

    // 3. ステータス検索: シンプルに比較
    // 3. ステータス検索: シンプルに比較
    // searchActive（検索用ステータス入力値）が空文字の場合はすべてマッチさせます。
    // 'active'や'non-active'などが指定された場合は、その内容に応じてメンバーのstatusと比較し、一致条件を作ります。
    // もしsearchActiveが'active'なら、member.status === 'active' のみマッチ
    // それ以外(''の場合はすべて、'active'でなければactive以外)はmember.status !== 'active'がマッチします。
    const matchesActive =
      searchActive === '' ||
      (searchActive === 'active' 
        ? member.status === 'active' 
        : member.status !== 'active');

    return matchesName && matchesScore && matchesActive;
  });

  // ソート処理
  // 目的: filteredMembers配列のシャローコピー（浅いコピー）を作成
  // 理由: JavaScriptのsort()メソッドは元の配列を直接変更する（破壊的メソッド）ため、元の配列を保護するために新しい配列を作る必要があります
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.score - b.score; // 昇順
    } else if (sortOrder === 'desc') {
      return b.score - a.score; // 降順
    }
    return 0; // ソートなし
  });

  // ソートボタンのクリックハンドラー
  const handleSortToggle = () => {
    if (sortOrder === 'none') {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('none');
    }
  };


  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetchMembersFromFakeApi();
        if (response.success) {
          setMembers(response.data);
        } else {
          setMembers([]);
          setError('データの取得に失敗しました');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setMembers([]);
        setError('エラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <Wrapper>
      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-bold mb-4">メンバー一覧</h1>
        <div className="mb-4 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">名前で検索</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="例: 田中"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">スコアで検索</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-3 py-2"
              value={searchScore}
              onChange={(e) => setSearchScore(e.target.value)}
              placeholder="例: 85"
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">ステータス</label>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={searchActive}
              onChange={(e) => setSearchActive(e.target.value)}
            >
              <option value="">すべて</option>
              <option value="active">アクティブ</option>
              <option value="inactive">非アクティブ</option>
            </select>
          </div>
        </div>


        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
              <p className="mt-4 text-gray-600">読み込み中...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!isLoading && !error && sortedMembers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            メンバーが見つかりません
          </div>
        )}

        {!isLoading && sortedMembers.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    メンバーID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名前
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <span>スコア</span>
                      <button
                        onClick={handleSortToggle}
                        className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                      >
                        {sortOrder === 'none' && '並替'}
                        {sortOrder === 'asc' && '↑昇順'}
                        {sortOrder === 'desc' && '↓降順'}
                      </button>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedMembers.map((member: Member) => (
                  <tr key={`member-${member.member_id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.member_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {member.status === 'active' ? 'アクティブ' : '非アクティブ'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
